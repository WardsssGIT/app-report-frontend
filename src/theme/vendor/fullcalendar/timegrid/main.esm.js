/* !
FullCalendar Time Grid Plugin v4.3.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/

import { createFormatter, removeElement, cssToStr, isMultiDayRange, htmlEscape, compareByFieldSpecs, applyStyle, FgEventRenderer, buildSegCompareObj, FillRenderer, memoizeRendering, createDuration, wholeDivideDurations, findElements, PositionCache, startOfDay, asRoughMs, formatIsoTimeString, addDurations, htmlToElement, createElement, multiplyDuration, DateComponent, hasBgRendering, Splitter, diffDays, buildGotoAnchorHtml, getAllDayHtml, ScrollComponent, matchCellWidths, uncompensateScroll, compensateScroll, subtractInnerElHeight, View, memoize, intersectRanges, Slicer, DayHeader, DaySeries, DayTable, createPlugin } from '@fullcalendar/core'
import { DayBgRow, DayGrid, SimpleDayGrid } from '@fullcalendar/daygrid'

/* ! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b }) ||
        function (d, b) { for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
    return extendStatics(d, b)
}

function __extends(d, b) {
    extendStatics(d, b)
    function __() { this.constructor = d }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
}

var __assign = function () {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}

/*
Only handles foreground segs.
Does not own rendering. Use for low-level util methods by TimeGrid.
*/
const TimeGridEventRenderer = /** @class */ (function (_super) {
    __extends(TimeGridEventRenderer, _super)
    function TimeGridEventRenderer(timeGrid) {
        const _this = _super.call(this, timeGrid.context) || this
        _this.timeGrid = timeGrid
        _this.fullTimeFormat = createFormatter({
            hour: 'numeric',
            minute: '2-digit',
            separator: _this.context.options.defaultRangeSeparator
        })
        return _this
    }
    // Given an array of foreground segments, render a DOM element for each, computes position,
    // and attaches to the column inner-container elements.
    TimeGridEventRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        const segsByCol = this.timeGrid.groupSegsByCol(segs)
        // order the segs within each column
        // TODO: have groupSegsByCol do this?
        for (let col = 0; col < segsByCol.length; col++) {
            segsByCol[col] = this.sortEventSegs(segsByCol[col])
        }
        this.segsByCol = segsByCol
        this.timeGrid.attachSegsByCol(segsByCol, this.timeGrid.fgContainerEls)
    }
    TimeGridEventRenderer.prototype.detachSegs = function (segs) {
        segs.forEach(function (seg) {
            removeElement(seg.el)
        })
        this.segsByCol = null
    }
    TimeGridEventRenderer.prototype.computeSegSizes = function (allSegs) {
        const _a = this; const timeGrid = _a.timeGrid; const segsByCol = _a.segsByCol
        const colCnt = timeGrid.colCnt
        timeGrid.computeSegVerticals(allSegs) // horizontals relies on this
        if (segsByCol) {
            for (let col = 0; col < colCnt; col++) {
                this.computeSegHorizontals(segsByCol[col]) // compute horizontal coordinates, z-index's, and reorder the array
            }
        }
    }
    TimeGridEventRenderer.prototype.assignSegSizes = function (allSegs) {
        const _a = this; const timeGrid = _a.timeGrid; const segsByCol = _a.segsByCol
        const colCnt = timeGrid.colCnt
        timeGrid.assignSegVerticals(allSegs) // horizontals relies on this
        if (segsByCol) {
            for (let col = 0; col < colCnt; col++) {
                this.assignSegCss(segsByCol[col])
            }
        }
    }
    // Computes a default event time formatting string if `eventTimeFormat` is not explicitly defined
    TimeGridEventRenderer.prototype.computeEventTimeFormat = function () {
        return {
            hour: 'numeric',
            minute: '2-digit',
            meridiem: false
        }
    }
    // Computes a default `displayEventEnd` value if one is not expliclty defined
    TimeGridEventRenderer.prototype.computeDisplayEventEnd = function () {
        return true
    }
    // Renders the HTML for a single event segment's default rendering
    TimeGridEventRenderer.prototype.renderSegHtml = function (seg, mirrorInfo) {
        const view = this.context.view
        const eventRange = seg.eventRange
        const eventDef = eventRange.def
        const eventUi = eventRange.ui
        const allDay = eventDef.allDay
        const isDraggable = view.computeEventDraggable(eventDef, eventUi)
        const isResizableFromStart = seg.isStart && view.computeEventStartResizable(eventDef, eventUi)
        const isResizableFromEnd = seg.isEnd && view.computeEventEndResizable(eventDef, eventUi)
        const classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, mirrorInfo)
        const skinCss = cssToStr(this.getSkinCss(eventUi))
        let timeText
        let fullTimeText // more verbose time text. for the print stylesheet
        let startTimeText // just the start time text
        classes.unshift('fc-time-grid-event')
        // if the event appears to span more than one day...
        if (isMultiDayRange(eventRange.range)) {
            // Don't display time text on segments that run entirely through a day.
            // That would appear as midnight-midnight and would look dumb.
            // Otherwise, display the time text for the *segment's* times (like 6pm-midnight or midnight-10am)
            if (seg.isStart || seg.isEnd) {
                const unzonedStart = seg.start
                const unzonedEnd = seg.end
                timeText = this._getTimeText(unzonedStart, unzonedEnd, allDay) // TODO: give the timezones
                fullTimeText = this._getTimeText(unzonedStart, unzonedEnd, allDay, this.fullTimeFormat)
                startTimeText = this._getTimeText(unzonedStart, unzonedEnd, allDay, null, false) // displayEnd=false
            }
        } else {
            // Display the normal time text for the *event's* times
            timeText = this.getTimeText(eventRange)
            fullTimeText = this.getTimeText(eventRange, this.fullTimeFormat)
            startTimeText = this.getTimeText(eventRange, null, false) // displayEnd=false
        }
        return '<a class="' + classes.join(' ') + '"' +
            (eventDef.url
                ? ' href="' + htmlEscape(eventDef.url) + '"'
                : '') +
            (skinCss
                ? ' style="' + skinCss + '"'
                : '') +
            '>' +
            '<div class="fc-content">' +
            (timeText
                ? '<div class="fc-time"' +
                    ' data-start="' + htmlEscape(startTimeText) + '"' +
                    ' data-full="' + htmlEscape(fullTimeText) + '"' +
                    '>' +
                    '<span>' + htmlEscape(timeText) + '</span>' +
                    '</div>'
                : '') +
            (eventDef.title
                ? '<div class="fc-title">' +
                    htmlEscape(eventDef.title) +
                    '</div>'
                : '') +
            '</div>' +
            /* TODO: write CSS for this
            (isResizableFromStart ?
              '<div class="fc-resizer fc-start-resizer"></div>' :
              ''
              ) +
            */
            (isResizableFromEnd
                ? '<div class="fc-resizer fc-end-resizer"></div>'
                : '') +
            '</a>'
    }
    // Given an array of segments that are all in the same column, sets the backwardCoord and forwardCoord on each.
    // Assumed the segs are already ordered.
    // NOTE: Also reorders the given array by date!
    TimeGridEventRenderer.prototype.computeSegHorizontals = function (segs) {
        let levels
        let level0
        let i
        levels = buildSlotSegLevels(segs)
        computeForwardSlotSegs(levels)
        if ((level0 = levels[0])) {
            for (i = 0; i < level0.length; i++) {
                computeSlotSegPressures(level0[i])
            }
            for (i = 0; i < level0.length; i++) {
                this.computeSegForwardBack(level0[i], 0, 0)
            }
        }
    }
    // Calculate seg.forwardCoord and seg.backwardCoord for the segment, where both values range
    // from 0 to 1. If the calendar is left-to-right, the seg.backwardCoord maps to "left" and
    // seg.forwardCoord maps to "right" (via percentage). Vice-versa if the calendar is right-to-left.
    //
    // The segment might be part of a "series", which means consecutive segments with the same pressure
    // who's width is unknown until an edge has been hit. `seriesBackwardPressure` is the number of
    // segments behind this one in the current series, and `seriesBackwardCoord` is the starting
    // coordinate of the first segment in the series.
    TimeGridEventRenderer.prototype.computeSegForwardBack = function (seg, seriesBackwardPressure, seriesBackwardCoord) {
        const forwardSegs = seg.forwardSegs
        let i
        if (seg.forwardCoord === undefined) { // not already computed
            if (!forwardSegs.length) {
                // if there are no forward segments, this segment should butt up against the edge
                seg.forwardCoord = 1
            } else {
                // sort highest pressure first
                this.sortForwardSegs(forwardSegs)
                // this segment's forwardCoord will be calculated from the backwardCoord of the
                // highest-pressure forward segment.
                this.computeSegForwardBack(forwardSegs[0], seriesBackwardPressure + 1, seriesBackwardCoord)
                seg.forwardCoord = forwardSegs[0].backwardCoord
            }
            // calculate the backwardCoord from the forwardCoord. consider the series
            seg.backwardCoord = seg.forwardCoord -
                (seg.forwardCoord - seriesBackwardCoord) / // available width for series
                    (seriesBackwardPressure + 1) // # of segments in the series
            // use this segment's coordinates to computed the coordinates of the less-pressurized
            // forward segments
            for (i = 0; i < forwardSegs.length; i++) {
                this.computeSegForwardBack(forwardSegs[i], 0, seg.forwardCoord)
            }
        }
    }
    TimeGridEventRenderer.prototype.sortForwardSegs = function (forwardSegs) {
        const objs = forwardSegs.map(buildTimeGridSegCompareObj)
        const specs = [
            // put higher-pressure first
            { field: 'forwardPressure', order: -1 },
            // put segments that are closer to initial edge first (and favor ones with no coords yet)
            { field: 'backwardCoord', order: 1 }
        ].concat(this.context.view.eventOrderSpecs)
        objs.sort(function (obj0, obj1) {
            return compareByFieldSpecs(obj0, obj1, specs)
        })
        return objs.map(function (c) {
            return c._seg
        })
    }
    // Given foreground event segments that have already had their position coordinates computed,
    // assigns position-related CSS values to their elements.
    TimeGridEventRenderer.prototype.assignSegCss = function (segs) {
        for (let _i = 0, segs_1 = segs; _i < segs_1.length; _i++) {
            const seg = segs_1[_i]
            applyStyle(seg.el, this.generateSegCss(seg))
            if (seg.level > 0) {
                seg.el.classList.add('fc-time-grid-event-inset')
            }
            // if the event is short that the title will be cut off,
            // attach a className that condenses the title into the time area.
            if (seg.eventRange.def.title && seg.bottom - seg.top < 30) {
                seg.el.classList.add('fc-short') // TODO: "condensed" is a better name
            }
        }
    }
    // Generates an object with CSS properties/values that should be applied to an event segment element.
    // Contains important positioning-related properties that should be applied to any event element, customized or not.
    TimeGridEventRenderer.prototype.generateSegCss = function (seg) {
        const shouldOverlap = this.context.options.slotEventOverlap
        const backwardCoord = seg.backwardCoord // the left side if LTR. the right side if RTL. floating-point
        let forwardCoord = seg.forwardCoord // the right side if LTR. the left side if RTL. floating-point
        const props = this.timeGrid.generateSegVerticalCss(seg) // get top/bottom first
        const isRtl = this.timeGrid.isRtl
        let left // amount of space from left edge, a fraction of the total width
        let right // amount of space from right edge, a fraction of the total width
        if (shouldOverlap) {
            // double the width, but don't go beyond the maximum forward coordinate (1.0)
            forwardCoord = Math.min(1, backwardCoord + (forwardCoord - backwardCoord) * 2)
        }
        if (isRtl) {
            left = 1 - forwardCoord
            right = backwardCoord
        } else {
            left = backwardCoord
            right = 1 - forwardCoord
        }
        props.zIndex = seg.level + 1 // convert from 0-base to 1-based
        props.left = left * 100 + '%'
        props.right = right * 100 + '%'
        if (shouldOverlap && seg.forwardPressure) {
            // add padding to the edge so that forward stacked events don't cover the resizer's icon
            props[isRtl ? 'marginLeft' : 'marginRight'] = 10 * 2 // 10 is a guesstimate of the icon's width
        }
        return props
    }
    return TimeGridEventRenderer
}(FgEventRenderer))
// Builds an array of segments "levels". The first level will be the leftmost tier of segments if the calendar is
// left-to-right, or the rightmost if the calendar is right-to-left. Assumes the segments are already ordered by date.
function buildSlotSegLevels(segs) {
    const levels = []
    let i
    let seg
    let j
    for (i = 0; i < segs.length; i++) {
        seg = segs[i]
        // go through all the levels and stop on the first level where there are no collisions
        for (j = 0; j < levels.length; j++) {
            if (!computeSlotSegCollisions(seg, levels[j]).length) {
                break
            }
        }
        seg.level = j;
        (levels[j] || (levels[j] = [])).push(seg)
    }
    return levels
}
// For every segment, figure out the other segments that are in subsequent
// levels that also occupy the same vertical space. Accumulate in seg.forwardSegs
function computeForwardSlotSegs(levels) {
    let i
    let level
    let j
    let seg
    let k
    for (i = 0; i < levels.length; i++) {
        level = levels[i]
        for (j = 0; j < level.length; j++) {
            seg = level[j]
            seg.forwardSegs = []
            for (k = i + 1; k < levels.length; k++) {
                computeSlotSegCollisions(seg, levels[k], seg.forwardSegs)
            }
        }
    }
}
// Figure out which path forward (via seg.forwardSegs) results in the longest path until
// the furthest edge is reached. The number of segments in this path will be seg.forwardPressure
function computeSlotSegPressures(seg) {
    const forwardSegs = seg.forwardSegs
    let forwardPressure = 0
    let i
    let forwardSeg
    if (seg.forwardPressure === undefined) { // not already computed
        for (i = 0; i < forwardSegs.length; i++) {
            forwardSeg = forwardSegs[i]
            // figure out the child's maximum forward path
            computeSlotSegPressures(forwardSeg)
            // either use the existing maximum, or use the child's forward pressure
            // plus one (for the forwardSeg itself)
            forwardPressure = Math.max(forwardPressure, 1 + forwardSeg.forwardPressure)
        }
        seg.forwardPressure = forwardPressure
    }
}
// Find all the segments in `otherSegs` that vertically collide with `seg`.
// Append into an optionally-supplied `results` array and return.
function computeSlotSegCollisions(seg, otherSegs, results) {
    if (results === void 0) { results = [] }
    for (let i = 0; i < otherSegs.length; i++) {
        if (isSlotSegCollision(seg, otherSegs[i])) {
            results.push(otherSegs[i])
        }
    }
    return results
}
// Do these segments occupy the same vertical space?
function isSlotSegCollision(seg1, seg2) {
    return seg1.bottom > seg2.top && seg1.top < seg2.bottom
}
function buildTimeGridSegCompareObj(seg) {
    const obj = buildSegCompareObj(seg)
    obj.forwardPressure = seg.forwardPressure
    obj.backwardCoord = seg.backwardCoord
    return obj
}

const TimeGridMirrorRenderer = /** @class */ (function (_super) {
    __extends(TimeGridMirrorRenderer, _super)
    function TimeGridMirrorRenderer() {
        return _super !== null && _super.apply(this, arguments) || this
    }
    TimeGridMirrorRenderer.prototype.attachSegs = function (segs, mirrorInfo) {
        this.segsByCol = this.timeGrid.groupSegsByCol(segs)
        this.timeGrid.attachSegsByCol(this.segsByCol, this.timeGrid.mirrorContainerEls)
        this.sourceSeg = mirrorInfo.sourceSeg
    }
    TimeGridMirrorRenderer.prototype.generateSegCss = function (seg) {
        const props = _super.prototype.generateSegCss.call(this, seg)
        const sourceSeg = this.sourceSeg
        if (sourceSeg && sourceSeg.col === seg.col) {
            const sourceSegProps = _super.prototype.generateSegCss.call(this, sourceSeg)
            props.left = sourceSegProps.left
            props.right = sourceSegProps.right
            props.marginLeft = sourceSegProps.marginLeft
            props.marginRight = sourceSegProps.marginRight
        }
        return props
    }
    return TimeGridMirrorRenderer
}(TimeGridEventRenderer))

const TimeGridFillRenderer = /** @class */ (function (_super) {
    __extends(TimeGridFillRenderer, _super)
    function TimeGridFillRenderer(timeGrid) {
        const _this = _super.call(this, timeGrid.context) || this
        _this.timeGrid = timeGrid
        return _this
    }
    TimeGridFillRenderer.prototype.attachSegs = function (type, segs) {
        const timeGrid = this.timeGrid
        let containerEls
        // TODO: more efficient lookup
        if (type === 'bgEvent') {
            containerEls = timeGrid.bgContainerEls
        } else if (type === 'businessHours') {
            containerEls = timeGrid.businessContainerEls
        } else if (type === 'highlight') {
            containerEls = timeGrid.highlightContainerEls
        }
        timeGrid.attachSegsByCol(timeGrid.groupSegsByCol(segs), containerEls)
        return segs.map(function (seg) {
            return seg.el
        })
    }
    TimeGridFillRenderer.prototype.computeSegSizes = function (segs) {
        this.timeGrid.computeSegVerticals(segs)
    }
    TimeGridFillRenderer.prototype.assignSegSizes = function (segs) {
        this.timeGrid.assignSegVerticals(segs)
    }
    return TimeGridFillRenderer
}(FillRenderer))

/* A component that renders one or more columns of vertical time slots
----------------------------------------------------------------------------------------------------------------------*/
// potential nice values for the slot-duration and interval-duration
// from largest to smallest
const AGENDA_STOCK_SUB_DURATIONS = [
    { hours: 1 },
    { minutes: 30 },
    { minutes: 15 },
    { seconds: 30 },
    { seconds: 15 }
]
const TimeGrid = /** @class */ (function (_super) {
    __extends(TimeGrid, _super)
    function TimeGrid(context, el, renderProps) {
        const _this = _super.call(this, context, el) || this
        _this.isSlatSizesDirty = false
        _this.isColSizesDirty = false
        _this.renderSlats = memoizeRendering(_this._renderSlats)
        const eventRenderer = _this.eventRenderer = new TimeGridEventRenderer(_this)
        const fillRenderer = _this.fillRenderer = new TimeGridFillRenderer(_this)
        _this.mirrorRenderer = new TimeGridMirrorRenderer(_this)
        const renderColumns = _this.renderColumns = memoizeRendering(_this._renderColumns, _this._unrenderColumns)
        _this.renderBusinessHours = memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'businessHours'), fillRenderer.unrender.bind(fillRenderer, 'businessHours'), [renderColumns])
        _this.renderDateSelection = memoizeRendering(_this._renderDateSelection, _this._unrenderDateSelection, [renderColumns])
        _this.renderFgEvents = memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderColumns])
        _this.renderBgEvents = memoizeRendering(fillRenderer.renderSegs.bind(fillRenderer, 'bgEvent'), fillRenderer.unrender.bind(fillRenderer, 'bgEvent'), [renderColumns])
        _this.renderEventSelection = memoizeRendering(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents])
        _this.renderEventDrag = memoizeRendering(_this._renderEventDrag, _this._unrenderEventDrag, [renderColumns])
        _this.renderEventResize = memoizeRendering(_this._renderEventResize, _this._unrenderEventResize, [renderColumns])
        _this.processOptions()
        el.innerHTML =
            '<div class="fc-bg"></div>' +
                '<div class="fc-slats"></div>' +
                '<hr class="fc-divider ' + _this.theme.getClass('widgetHeader') + '" style="display:none" />'
        _this.rootBgContainerEl = el.querySelector('.fc-bg')
        _this.slatContainerEl = el.querySelector('.fc-slats')
        _this.bottomRuleEl = el.querySelector('.fc-divider')
        _this.renderProps = renderProps
        return _this
    }
    /* Options
    ------------------------------------------------------------------------------------------------------------------*/
    // Parses various options into properties of this object
    TimeGrid.prototype.processOptions = function () {
        let slotDuration = this.opt('slotDuration')
        let snapDuration = this.opt('snapDuration')
        let snapsPerSlot
        let input
        slotDuration = createDuration(slotDuration)
        snapDuration = snapDuration ? createDuration(snapDuration) : slotDuration
        snapsPerSlot = wholeDivideDurations(slotDuration, snapDuration)
        if (snapsPerSlot === null) {
            snapDuration = slotDuration
            snapsPerSlot = 1
            // TODO: say warning?
        }
        this.slotDuration = slotDuration
        this.snapDuration = snapDuration
        this.snapsPerSlot = snapsPerSlot
        // might be an array value (for TimelineView).
        // if so, getting the most granular entry (the last one probably).
        input = this.opt('slotLabelFormat')
        if (Array.isArray(input)) {
            input = input[input.length - 1]
        }
        this.labelFormat = createFormatter(input || {
            hour: 'numeric',
            minute: '2-digit',
            omitZeroMinute: true,
            meridiem: 'short'
        })
        input = this.opt('slotLabelInterval')
        this.labelInterval = input
            ? createDuration(input)
            : this.computeLabelInterval(slotDuration)
    }
    // Computes an automatic value for slotLabelInterval
    TimeGrid.prototype.computeLabelInterval = function (slotDuration) {
        let i
        let labelInterval
        let slotsPerLabel
        // find the smallest stock label interval that results in more than one slots-per-label
        for (i = AGENDA_STOCK_SUB_DURATIONS.length - 1; i >= 0; i--) {
            labelInterval = createDuration(AGENDA_STOCK_SUB_DURATIONS[i])
            slotsPerLabel = wholeDivideDurations(labelInterval, slotDuration)
            if (slotsPerLabel !== null && slotsPerLabel > 1) {
                return labelInterval
            }
        }
        return slotDuration // fall back
    }
    /* Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.render = function (props) {
        const cells = props.cells
        this.colCnt = cells.length
        this.renderSlats(props.dateProfile)
        this.renderColumns(props.cells, props.dateProfile)
        this.renderBusinessHours(props.businessHourSegs)
        this.renderDateSelection(props.dateSelectionSegs)
        this.renderFgEvents(props.fgEventSegs)
        this.renderBgEvents(props.bgEventSegs)
        this.renderEventSelection(props.eventSelection)
        this.renderEventDrag(props.eventDrag)
        this.renderEventResize(props.eventResize)
    }
    TimeGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        // should unrender everything else too
        this.renderSlats.unrender()
        this.renderColumns.unrender()
    }
    TimeGrid.prototype.updateSize = function (isResize) {
        const _a = this; const fillRenderer = _a.fillRenderer; const eventRenderer = _a.eventRenderer; const mirrorRenderer = _a.mirrorRenderer
        if (isResize || this.isSlatSizesDirty) {
            this.buildSlatPositions()
            this.isSlatSizesDirty = false
        }
        if (isResize || this.isColSizesDirty) {
            this.buildColPositions()
            this.isColSizesDirty = false
        }
        fillRenderer.computeSizes(isResize)
        eventRenderer.computeSizes(isResize)
        mirrorRenderer.computeSizes(isResize)
        fillRenderer.assignSizes(isResize)
        eventRenderer.assignSizes(isResize)
        mirrorRenderer.assignSizes(isResize)
    }
    TimeGrid.prototype._renderSlats = function (dateProfile) {
        const theme = this.theme
        this.slatContainerEl.innerHTML =
            '<table class="' + theme.getClass('tableGrid') + '">' +
                this.renderSlatRowHtml(dateProfile) +
                '</table>'
        this.slatEls = findElements(this.slatContainerEl, 'tr')
        this.slatPositions = new PositionCache(this.el, this.slatEls, false, true // vertical
        )
        this.isSlatSizesDirty = true
    }
    // Generates the HTML for the horizontal "slats" that run width-wise. Has a time axis on a side. Depends on RTL.
    TimeGrid.prototype.renderSlatRowHtml = function (dateProfile) {
        const _a = this; const dateEnv = _a.dateEnv; const theme = _a.theme; const isRtl = _a.isRtl
        let html = ''
        const dayStart = startOfDay(dateProfile.renderRange.start)
        let slotTime = dateProfile.minTime
        let slotIterator = createDuration(0)
        let slotDate // will be on the view's first day, but we only care about its time
        let isLabeled
        let axisHtml
        // Calculate the time for each slot
        while (asRoughMs(slotTime) < asRoughMs(dateProfile.maxTime)) {
            slotDate = dateEnv.add(dayStart, slotTime)
            isLabeled = wholeDivideDurations(slotIterator, this.labelInterval) !== null
            axisHtml =
                '<td class="fc-axis fc-time ' + theme.getClass('widgetContent') + '">' +
                    (isLabeled
                        ? '<span>' + // for matchCellWidths
                            htmlEscape(dateEnv.format(slotDate, this.labelFormat)) +
                            '</span>'
                        : '') +
                    '</td>'
            html +=
                '<tr data-time="' + formatIsoTimeString(slotDate) + '"' +
                    (isLabeled ? '' : ' class="fc-minor"') +
                    '>' +
                    (!isRtl ? axisHtml : '') +
                    '<td class="' + theme.getClass('widgetContent') + '"></td>' +
                    (isRtl ? axisHtml : '') +
                    '</tr>'
            slotTime = addDurations(slotTime, this.slotDuration)
            slotIterator = addDurations(slotIterator, this.slotDuration)
        }
        return html
    }
    TimeGrid.prototype._renderColumns = function (cells, dateProfile) {
        const _a = this; const theme = _a.theme; const dateEnv = _a.dateEnv; const view = _a.view
        const bgRow = new DayBgRow(this.context)
        this.rootBgContainerEl.innerHTML =
            '<table class="' + theme.getClass('tableGrid') + '">' +
                bgRow.renderHtml({
                    cells,
                    dateProfile,
                    renderIntroHtml: this.renderProps.renderBgIntroHtml
                }) +
                '</table>'
        this.colEls = findElements(this.el, '.fc-day, .fc-disabled-day')
        for (let col = 0; col < this.colCnt; col++) {
            this.publiclyTrigger('dayRender', [
                {
                    date: dateEnv.toDate(cells[col].date),
                    el: this.colEls[col],
                    view
                }
            ])
        }
        if (this.isRtl) {
            this.colEls.reverse()
        }
        this.colPositions = new PositionCache(this.el, this.colEls, true, // horizontal
        false)
        this.renderContentSkeleton()
        this.isColSizesDirty = true
    }
    TimeGrid.prototype._unrenderColumns = function () {
        this.unrenderContentSkeleton()
    }
    /* Content Skeleton
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders the DOM that the view's content will live in
    TimeGrid.prototype.renderContentSkeleton = function () {
        const parts = []
        let skeletonEl
        parts.push(this.renderProps.renderIntroHtml())
        for (let i = 0; i < this.colCnt; i++) {
            parts.push('<td>' +
                '<div class="fc-content-col">' +
                '<div class="fc-event-container fc-mirror-container"></div>' +
                '<div class="fc-event-container"></div>' +
                '<div class="fc-highlight-container"></div>' +
                '<div class="fc-bgevent-container"></div>' +
                '<div class="fc-business-container"></div>' +
                '</div>' +
                '</td>')
        }
        if (this.isRtl) {
            parts.reverse()
        }
        skeletonEl = this.contentSkeletonEl = htmlToElement('<div class="fc-content-skeleton">' +
            '<table>' +
            '<tr>' + parts.join('') + '</tr>' +
            '</table>' +
            '</div>')
        this.colContainerEls = findElements(skeletonEl, '.fc-content-col')
        this.mirrorContainerEls = findElements(skeletonEl, '.fc-mirror-container')
        this.fgContainerEls = findElements(skeletonEl, '.fc-event-container:not(.fc-mirror-container)')
        this.bgContainerEls = findElements(skeletonEl, '.fc-bgevent-container')
        this.highlightContainerEls = findElements(skeletonEl, '.fc-highlight-container')
        this.businessContainerEls = findElements(skeletonEl, '.fc-business-container')
        if (this.isRtl) {
            this.colContainerEls.reverse()
            this.mirrorContainerEls.reverse()
            this.fgContainerEls.reverse()
            this.bgContainerEls.reverse()
            this.highlightContainerEls.reverse()
            this.businessContainerEls.reverse()
        }
        this.el.appendChild(skeletonEl)
    }
    TimeGrid.prototype.unrenderContentSkeleton = function () {
        removeElement(this.contentSkeletonEl)
    }
    // Given a flat array of segments, return an array of sub-arrays, grouped by each segment's col
    TimeGrid.prototype.groupSegsByCol = function (segs) {
        const segsByCol = []
        let i
        for (i = 0; i < this.colCnt; i++) {
            segsByCol.push([])
        }
        for (i = 0; i < segs.length; i++) {
            segsByCol[segs[i].col].push(segs[i])
        }
        return segsByCol
    }
    // Given segments grouped by column, insert the segments' elements into a parallel array of container
    // elements, each living within a column.
    TimeGrid.prototype.attachSegsByCol = function (segsByCol, containerEls) {
        let col
        let segs
        let i
        for (col = 0; col < this.colCnt; col++) { // iterate each column grouping
            segs = segsByCol[col]
            for (i = 0; i < segs.length; i++) {
                containerEls[col].appendChild(segs[i].el)
            }
        }
    }
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.getNowIndicatorUnit = function () {
        return 'minute' // will refresh on the minute
    }
    TimeGrid.prototype.renderNowIndicator = function (segs, date) {
        // HACK: if date columns not ready for some reason (scheduler)
        if (!this.colContainerEls) {
            return
        }
        const top = this.computeDateTop(date)
        const nodes = []
        let i
        // render lines within the columns
        for (i = 0; i < segs.length; i++) {
            const lineEl = createElement('div', { className: 'fc-now-indicator fc-now-indicator-line' })
            lineEl.style.top = top + 'px'
            this.colContainerEls[segs[i].col].appendChild(lineEl)
            nodes.push(lineEl)
        }
        // render an arrow over the axis
        if (segs.length > 0) { // is the current time in view?
            const arrowEl = createElement('div', { className: 'fc-now-indicator fc-now-indicator-arrow' })
            arrowEl.style.top = top + 'px'
            this.contentSkeletonEl.appendChild(arrowEl)
            nodes.push(arrowEl)
        }
        this.nowIndicatorEls = nodes
    }
    TimeGrid.prototype.unrenderNowIndicator = function () {
        if (this.nowIndicatorEls) {
            this.nowIndicatorEls.forEach(removeElement)
            this.nowIndicatorEls = null
        }
    }
    /* Coordinates
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.getTotalSlatHeight = function () {
        return this.slatContainerEl.getBoundingClientRect().height
    }
    // Computes the top coordinate, relative to the bounds of the grid, of the given date.
    // A `startOfDayDate` must be given for avoiding ambiguity over how to treat midnight.
    TimeGrid.prototype.computeDateTop = function (when, startOfDayDate) {
        if (!startOfDayDate) {
            startOfDayDate = startOfDay(when)
        }
        return this.computeTimeTop(createDuration(when.valueOf() - startOfDayDate.valueOf()))
    }
    // Computes the top coordinate, relative to the bounds of the grid, of the given time (a Duration).
    TimeGrid.prototype.computeTimeTop = function (duration) {
        const len = this.slatEls.length
        const dateProfile = this.props.dateProfile
        let slatCoverage = (duration.milliseconds - asRoughMs(dateProfile.minTime)) / asRoughMs(this.slotDuration) // floating-point value of # of slots covered
        let slatIndex
        let slatRemainder
        // compute a floating-point number for how many slats should be progressed through.
        // from 0 to number of slats (inclusive)
        // constrained because minTime/maxTime might be customized.
        slatCoverage = Math.max(0, slatCoverage)
        slatCoverage = Math.min(len, slatCoverage)
        // an integer index of the furthest whole slat
        // from 0 to number slats (*exclusive*, so len-1)
        slatIndex = Math.floor(slatCoverage)
        slatIndex = Math.min(slatIndex, len - 1)
        // how much further through the slatIndex slat (from 0.0-1.0) must be covered in addition.
        // could be 1.0 if slatCoverage is covering *all* the slots
        slatRemainder = slatCoverage - slatIndex
        return this.slatPositions.tops[slatIndex] +
            this.slatPositions.getHeight(slatIndex) * slatRemainder
    }
    // For each segment in an array, computes and assigns its top and bottom properties
    TimeGrid.prototype.computeSegVerticals = function (segs) {
        const eventMinHeight = this.opt('timeGridEventMinHeight')
        let i
        let seg
        let dayDate
        for (i = 0; i < segs.length; i++) {
            seg = segs[i]
            dayDate = this.props.cells[seg.col].date
            seg.top = this.computeDateTop(seg.start, dayDate)
            seg.bottom = Math.max(seg.top + eventMinHeight, this.computeDateTop(seg.end, dayDate))
        }
    }
    // Given segments that already have their top/bottom properties computed, applies those values to
    // the segments' elements.
    TimeGrid.prototype.assignSegVerticals = function (segs) {
        let i
        let seg
        for (i = 0; i < segs.length; i++) {
            seg = segs[i]
            applyStyle(seg.el, this.generateSegVerticalCss(seg))
        }
    }
    // Generates an object with CSS properties for the top/bottom coordinates of a segment element
    TimeGrid.prototype.generateSegVerticalCss = function (seg) {
        return {
            top: seg.top,
            bottom: -seg.bottom // flipped because needs to be space beyond bottom edge of event container
        }
    }
    /* Sizing
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.buildPositionCaches = function () {
        this.buildColPositions()
        this.buildSlatPositions()
    }
    TimeGrid.prototype.buildColPositions = function () {
        this.colPositions.build()
    }
    TimeGrid.prototype.buildSlatPositions = function () {
        this.slatPositions.build()
    }
    /* Hit System
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype.positionToHit = function (positionLeft, positionTop) {
        const _a = this; const dateEnv = _a.dateEnv; const snapsPerSlot = _a.snapsPerSlot; const slatPositions = _a.slatPositions; const colPositions = _a.colPositions
        const colIndex = colPositions.leftToIndex(positionLeft)
        const slatIndex = slatPositions.topToIndex(positionTop)
        if (colIndex != null && slatIndex != null) {
            const slatTop = slatPositions.tops[slatIndex]
            const slatHeight = slatPositions.getHeight(slatIndex)
            const partial = (positionTop - slatTop) / slatHeight // floating point number between 0 and 1
            const localSnapIndex = Math.floor(partial * snapsPerSlot) // the snap # relative to start of slat
            const snapIndex = slatIndex * snapsPerSlot + localSnapIndex
            const dayDate = this.props.cells[colIndex].date
            const time = addDurations(this.props.dateProfile.minTime, multiplyDuration(this.snapDuration, snapIndex))
            const start = dateEnv.add(dayDate, time)
            const end = dateEnv.add(start, this.snapDuration)
            return {
                col: colIndex,
                dateSpan: {
                    range: { start, end },
                    allDay: false
                },
                dayEl: this.colEls[colIndex],
                relativeRect: {
                    left: colPositions.lefts[colIndex],
                    right: colPositions.rights[colIndex],
                    top: slatTop,
                    bottom: slatTop + slatHeight
                }
            }
        }
    }
    /* Event Drag Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype._renderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances)
            if (state.isEvent) {
                this.mirrorRenderer.renderSegs(state.segs, { isDragging: true, sourceSeg: state.sourceSeg })
            } else {
                this.fillRenderer.renderSegs('highlight', state.segs)
            }
        }
    }
    TimeGrid.prototype._unrenderEventDrag = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances)
            this.mirrorRenderer.unrender(state.segs, { isDragging: true, sourceSeg: state.sourceSeg })
            this.fillRenderer.unrender('highlight')
        }
    }
    /* Event Resize Visualization
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGrid.prototype._renderEventResize = function (state) {
        if (state) {
            this.eventRenderer.hideByHash(state.affectedInstances)
            this.mirrorRenderer.renderSegs(state.segs, { isResizing: true, sourceSeg: state.sourceSeg })
        }
    }
    TimeGrid.prototype._unrenderEventResize = function (state) {
        if (state) {
            this.eventRenderer.showByHash(state.affectedInstances)
            this.mirrorRenderer.unrender(state.segs, { isResizing: true, sourceSeg: state.sourceSeg })
        }
    }
    /* Selection
    ------------------------------------------------------------------------------------------------------------------*/
    // Renders a visual indication of a selection. Overrides the default, which was to simply render a highlight.
    TimeGrid.prototype._renderDateSelection = function (segs) {
        if (segs) {
            if (this.opt('selectMirror')) {
                this.mirrorRenderer.renderSegs(segs, { isSelecting: true })
            } else {
                this.fillRenderer.renderSegs('highlight', segs)
            }
        }
    }
    TimeGrid.prototype._unrenderDateSelection = function (segs) {
        this.mirrorRenderer.unrender(segs, { isSelecting: true })
        this.fillRenderer.unrender('highlight')
    }
    return TimeGrid
}(DateComponent))

const AllDaySplitter = /** @class */ (function (_super) {
    __extends(AllDaySplitter, _super)
    function AllDaySplitter() {
        return _super !== null && _super.apply(this, arguments) || this
    }
    AllDaySplitter.prototype.getKeyInfo = function () {
        return {
            allDay: {},
            timed: {}
        }
    }
    AllDaySplitter.prototype.getKeysForDateSpan = function (dateSpan) {
        if (dateSpan.allDay) {
            return ['allDay']
        } else {
            return ['timed']
        }
    }
    AllDaySplitter.prototype.getKeysForEventDef = function (eventDef) {
        if (!eventDef.allDay) {
            return ['timed']
        } else if (hasBgRendering(eventDef)) {
            return ['timed', 'allDay']
        } else {
            return ['allDay']
        }
    }
    return AllDaySplitter
}(Splitter))

const TIMEGRID_ALL_DAY_EVENT_LIMIT = 5
const WEEK_HEADER_FORMAT = createFormatter({ week: 'short' })
/* An abstract class for all timegrid-related views. Displays one more columns with time slots running vertically.
----------------------------------------------------------------------------------------------------------------------*/
// Is a manager for the TimeGrid subcomponent and possibly the DayGrid subcomponent (if allDaySlot is on).
// Responsible for managing width/height.
const TimeGridView = /** @class */ (function (_super) {
    __extends(TimeGridView, _super)
    function TimeGridView(context, viewSpec, dateProfileGenerator, parentEl) {
        const _this = _super.call(this, context, viewSpec, dateProfileGenerator, parentEl) || this
        _this.splitter = new AllDaySplitter()
        /* Header Render Methods
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that will go before the day-of week header cells
        _this.renderHeadIntroHtml = function () {
            const _a = _this; const theme = _a.theme; const dateEnv = _a.dateEnv
            const range = _this.props.dateProfile.renderRange
            const dayCnt = diffDays(range.start, range.end)
            let weekText
            if (_this.opt('weekNumbers')) {
                weekText = dateEnv.format(range.start, WEEK_HEADER_FORMAT)
                return '' +
                    '<th class="fc-axis fc-week-number ' + theme.getClass('widgetHeader') + '" ' + _this.axisStyleAttr() + '>' +
                    buildGotoAnchorHtml(// aside from link, important for matchCellWidths
                    _this, { date: range.start, type: 'week', forceOff: dayCnt > 1 }, htmlEscape(weekText) // inner HTML
                    ) +
                    '</th>'
            } else {
                return '<th class="fc-axis ' + theme.getClass('widgetHeader') + '" ' + _this.axisStyleAttr() + '></th>'
            }
        }
        /* Time Grid Render Methods
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that goes before the bg of the TimeGrid slot area. Long vertical column.
        _this.renderTimeGridBgIntroHtml = function () {
            const theme = _this.theme
            return '<td class="fc-axis ' + theme.getClass('widgetContent') + '" ' + _this.axisStyleAttr() + '></td>'
        }
        // Generates the HTML that goes before all other types of cells.
        // Affects content-skeleton, mirror-skeleton, highlight-skeleton for both the time-grid and day-grid.
        _this.renderTimeGridIntroHtml = function () {
            return '<td class="fc-axis" ' + _this.axisStyleAttr() + '></td>'
        }
        /* Day Grid Render Methods
        ------------------------------------------------------------------------------------------------------------------*/
        // Generates the HTML that goes before the all-day cells
        _this.renderDayGridBgIntroHtml = function () {
            const theme = _this.theme
            return '' +
                '<td class="fc-axis ' + theme.getClass('widgetContent') + '" ' + _this.axisStyleAttr() + '>' +
                '<span>' + // needed for matchCellWidths
                getAllDayHtml(_this) +
                '</span>' +
                '</td>'
        }
        // Generates the HTML that goes before all other types of cells.
        // Affects content-skeleton, mirror-skeleton, highlight-skeleton for both the time-grid and day-grid.
        _this.renderDayGridIntroHtml = function () {
            return '<td class="fc-axis" ' + _this.axisStyleAttr() + '></td>'
        }
        _this.el.classList.add('fc-timeGrid-view')
        _this.el.innerHTML = _this.renderSkeletonHtml()
        _this.scroller = new ScrollComponent('hidden', // overflow x
        'auto' // overflow y
        )
        const timeGridWrapEl = _this.scroller.el
        _this.el.querySelector('.fc-body > tr > td').appendChild(timeGridWrapEl)
        timeGridWrapEl.classList.add('fc-time-grid-container')
        const timeGridEl = createElement('div', { className: 'fc-time-grid' })
        timeGridWrapEl.appendChild(timeGridEl)
        _this.timeGrid = new TimeGrid(_this.context, timeGridEl, {
            renderBgIntroHtml: _this.renderTimeGridBgIntroHtml,
            renderIntroHtml: _this.renderTimeGridIntroHtml
        })
        if (_this.opt('allDaySlot')) { // should we display the "all-day" area?
            _this.dayGrid = new DayGrid(// the all-day subcomponent of this view
            _this.context, _this.el.querySelector('.fc-day-grid'), {
                renderNumberIntroHtml: _this.renderDayGridIntroHtml,
                renderBgIntroHtml: _this.renderDayGridBgIntroHtml,
                renderIntroHtml: _this.renderDayGridIntroHtml,
                colWeekNumbersVisible: false,
                cellWeekNumbersVisible: false
            })
            // have the day-grid extend it's coordinate area over the <hr> dividing the two grids
            const dividerEl = _this.el.querySelector('.fc-divider')
            _this.dayGrid.bottomCoordPadding = dividerEl.getBoundingClientRect().height
        }
        return _this
    }
    TimeGridView.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        this.timeGrid.destroy()
        if (this.dayGrid) {
            this.dayGrid.destroy()
        }
        this.scroller.destroy()
    }
    /* Rendering
    ------------------------------------------------------------------------------------------------------------------*/
    // Builds the HTML skeleton for the view.
    // The day-grid and time-grid components will render inside containers defined by this HTML.
    TimeGridView.prototype.renderSkeletonHtml = function () {
        const theme = this.theme
        return '' +
            '<table class="' + theme.getClass('tableGrid') + '">' +
            (this.opt('columnHeader')
                ? '<thead class="fc-head">' +
                    '<tr>' +
                    '<td class="fc-head-container ' + theme.getClass('widgetHeader') + '">&nbsp;</td>' +
                    '</tr>' +
                    '</thead>'
                : '') +
            '<tbody class="fc-body">' +
            '<tr>' +
            '<td class="' + theme.getClass('widgetContent') + '">' +
            (this.opt('allDaySlot')
                ? '<div class="fc-day-grid"></div>' +
                    '<hr class="fc-divider ' + theme.getClass('widgetHeader') + '" />'
                : '') +
            '</td>' +
            '</tr>' +
            '</tbody>' +
            '</table>'
    }
    /* Now Indicator
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGridView.prototype.getNowIndicatorUnit = function () {
        return this.timeGrid.getNowIndicatorUnit()
    }
    // subclasses should implement
    // renderNowIndicator(date: DateMarker) {
    // }
    TimeGridView.prototype.unrenderNowIndicator = function () {
        this.timeGrid.unrenderNowIndicator()
    }
    /* Dimensions
    ------------------------------------------------------------------------------------------------------------------*/
    TimeGridView.prototype.updateSize = function (isResize, viewHeight, isAuto) {
        _super.prototype.updateSize.call(this, isResize, viewHeight, isAuto) // will call updateBaseSize. important that executes first
        this.timeGrid.updateSize(isResize)
        if (this.dayGrid) {
            this.dayGrid.updateSize(isResize)
        }
    }
    // Adjusts the vertical dimensions of the view to the specified values
    TimeGridView.prototype.updateBaseSize = function (isResize, viewHeight, isAuto) {
        const _this = this
        let eventLimit
        let scrollerHeight
        let scrollbarWidths
        // make all axis cells line up
        this.axisWidth = matchCellWidths(findElements(this.el, '.fc-axis'))
        // hack to give the view some height prior to timeGrid's columns being rendered
        // TODO: separate setting height from scroller VS timeGrid.
        if (!this.timeGrid.colEls) {
            if (!isAuto) {
                scrollerHeight = this.computeScrollerHeight(viewHeight)
                this.scroller.setHeight(scrollerHeight)
            }
            return
        }
        // set of fake row elements that must compensate when scroller has scrollbars
        const noScrollRowEls = findElements(this.el, '.fc-row').filter(function (node) {
            return !_this.scroller.el.contains(node)
        })
        // reset all dimensions back to the original state
        this.timeGrid.bottomRuleEl.style.display = 'none' // will be shown later if this <hr> is necessary
        this.scroller.clear() // sets height to 'auto' and clears overflow
        noScrollRowEls.forEach(uncompensateScroll)
        // limit number of events in the all-day area
        if (this.dayGrid) {
            this.dayGrid.removeSegPopover() // kill the "more" popover if displayed
            eventLimit = this.opt('eventLimit')
            if (eventLimit && typeof eventLimit !== 'number') {
                eventLimit = TIMEGRID_ALL_DAY_EVENT_LIMIT // make sure "auto" goes to a real number
            }
            if (eventLimit) {
                this.dayGrid.limitRows(eventLimit)
            }
        }
        if (!isAuto) { // should we force dimensions of the scroll container?
            scrollerHeight = this.computeScrollerHeight(viewHeight)
            this.scroller.setHeight(scrollerHeight)
            scrollbarWidths = this.scroller.getScrollbarWidths()
            if (scrollbarWidths.left || scrollbarWidths.right) { // using scrollbars?
                // make the all-day and header rows lines up
                noScrollRowEls.forEach(function (rowEl) {
                    compensateScroll(rowEl, scrollbarWidths)
                })
                // the scrollbar compensation might have changed text flow, which might affect height, so recalculate
                // and reapply the desired height to the scroller.
                scrollerHeight = this.computeScrollerHeight(viewHeight)
                this.scroller.setHeight(scrollerHeight)
            }
            // guarantees the same scrollbar widths
            this.scroller.lockOverflow(scrollbarWidths)
            // if there's any space below the slats, show the horizontal rule.
            // this won't cause any new overflow, because lockOverflow already called.
            if (this.timeGrid.getTotalSlatHeight() < scrollerHeight) {
                this.timeGrid.bottomRuleEl.style.display = ''
            }
        }
    }
    // given a desired total height of the view, returns what the height of the scroller should be
    TimeGridView.prototype.computeScrollerHeight = function (viewHeight) {
        return viewHeight -
            subtractInnerElHeight(this.el, this.scroller.el) // everything that's NOT the scroller
    }
    /* Scroll
    ------------------------------------------------------------------------------------------------------------------*/
    // Computes the initial pre-configured scroll state prior to allowing the user to change it
    TimeGridView.prototype.computeDateScroll = function (duration) {
        let top = this.timeGrid.computeTimeTop(duration)
        // zoom can give weird floating-point values. rather scroll a little bit further
        top = Math.ceil(top)
        if (top) {
            top++ // to overcome top border that slots beyond the first have. looks better
        }
        return { top }
    }
    TimeGridView.prototype.queryDateScroll = function () {
        return { top: this.scroller.getScrollTop() }
    }
    TimeGridView.prototype.applyDateScroll = function (scroll) {
        if (scroll.top !== undefined) {
            this.scroller.setScrollTop(scroll.top)
        }
    }
    // Generates an HTML attribute string for setting the width of the axis, if it is known
    TimeGridView.prototype.axisStyleAttr = function () {
        if (this.axisWidth != null) {
            return 'style="width:' + this.axisWidth + 'px"'
        }
        return ''
    }
    return TimeGridView
}(View))
TimeGridView.prototype.usesMinMaxTime = true // indicates that minTime/maxTime affects rendering

const SimpleTimeGrid = /** @class */ (function (_super) {
    __extends(SimpleTimeGrid, _super)
    function SimpleTimeGrid(context, timeGrid) {
        const _this = _super.call(this, context, timeGrid.el) || this
        _this.buildDayRanges = memoize(buildDayRanges)
        _this.slicer = new TimeGridSlicer()
        _this.timeGrid = timeGrid
        context.calendar.registerInteractiveComponent(_this, {
            el: _this.timeGrid.el
        })
        return _this
    }
    SimpleTimeGrid.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        this.calendar.unregisterInteractiveComponent(this)
    }
    SimpleTimeGrid.prototype.render = function (props) {
        const dateProfile = props.dateProfile; const dayTable = props.dayTable
        const dayRanges = this.dayRanges = this.buildDayRanges(dayTable, dateProfile, this.dateEnv)
        this.timeGrid.receiveProps(__assign({}, this.slicer.sliceProps(props, dateProfile, null, this.timeGrid, dayRanges), { dateProfile, cells: dayTable.cells[0] }))
    }
    SimpleTimeGrid.prototype.renderNowIndicator = function (date) {
        this.timeGrid.renderNowIndicator(this.slicer.sliceNowDate(date, this.timeGrid, this.dayRanges), date)
    }
    SimpleTimeGrid.prototype.buildPositionCaches = function () {
        this.timeGrid.buildPositionCaches()
    }
    SimpleTimeGrid.prototype.queryHit = function (positionLeft, positionTop) {
        const rawHit = this.timeGrid.positionToHit(positionLeft, positionTop)
        if (rawHit) {
            return {
                component: this.timeGrid,
                dateSpan: rawHit.dateSpan,
                dayEl: rawHit.dayEl,
                rect: {
                    left: rawHit.relativeRect.left,
                    right: rawHit.relativeRect.right,
                    top: rawHit.relativeRect.top,
                    bottom: rawHit.relativeRect.bottom
                },
                layer: 0
            }
        }
    }
    return SimpleTimeGrid
}(DateComponent))
function buildDayRanges(dayTable, dateProfile, dateEnv) {
    const ranges = []
    for (let _i = 0, _a = dayTable.headerDates; _i < _a.length; _i++) {
        const date = _a[_i]
        ranges.push({
            start: dateEnv.add(date, dateProfile.minTime),
            end: dateEnv.add(date, dateProfile.maxTime)
        })
    }
    return ranges
}
var TimeGridSlicer = /** @class */ (function (_super) {
    __extends(TimeGridSlicer, _super)
    function TimeGridSlicer() {
        return _super !== null && _super.apply(this, arguments) || this
    }
    TimeGridSlicer.prototype.sliceRange = function (range, dayRanges) {
        const segs = []
        for (let col = 0; col < dayRanges.length; col++) {
            const segRange = intersectRanges(range, dayRanges[col])
            if (segRange) {
                segs.push({
                    start: segRange.start,
                    end: segRange.end,
                    isStart: segRange.start.valueOf() === range.start.valueOf(),
                    isEnd: segRange.end.valueOf() === range.end.valueOf(),
                    col
                })
            }
        }
        return segs
    }
    return TimeGridSlicer
}(Slicer))

const TimeGridView$1 = /** @class */ (function (_super) {
    __extends(TimeGridView, _super)
    function TimeGridView(_context, viewSpec, dateProfileGenerator, parentEl) {
        const _this = _super.call(this, _context, viewSpec, dateProfileGenerator, parentEl) || this
        _this.buildDayTable = memoize(buildDayTable)
        if (_this.opt('columnHeader')) {
            _this.header = new DayHeader(_this.context, _this.el.querySelector('.fc-head-container'))
        }
        _this.simpleTimeGrid = new SimpleTimeGrid(_this.context, _this.timeGrid)
        if (_this.dayGrid) {
            _this.simpleDayGrid = new SimpleDayGrid(_this.context, _this.dayGrid)
        }
        return _this
    }
    TimeGridView.prototype.destroy = function () {
        _super.prototype.destroy.call(this)
        if (this.header) {
            this.header.destroy()
        }
        this.simpleTimeGrid.destroy()
        if (this.simpleDayGrid) {
            this.simpleDayGrid.destroy()
        }
    }
    TimeGridView.prototype.render = function (props) {
        _super.prototype.render.call(this, props) // for flags for updateSize
        const dateProfile = this.props.dateProfile
        const dayTable = this.buildDayTable(dateProfile, this.dateProfileGenerator)
        const splitProps = this.splitter.splitProps(props)
        if (this.header) {
            this.header.receiveProps({
                dateProfile,
                dates: dayTable.headerDates,
                datesRepDistinctDays: true,
                renderIntroHtml: this.renderHeadIntroHtml
            })
        }
        this.simpleTimeGrid.receiveProps(__assign({}, splitProps.timed, {
 dateProfile,
            dayTable
}))
        if (this.simpleDayGrid) {
            this.simpleDayGrid.receiveProps(__assign({}, splitProps.allDay, {
 dateProfile,
                dayTable,
nextDayThreshold: this.nextDayThreshold,
isRigid: false
}))
        }
    }
    TimeGridView.prototype.renderNowIndicator = function (date) {
        this.simpleTimeGrid.renderNowIndicator(date)
    }
    return TimeGridView
}(TimeGridView))
function buildDayTable(dateProfile, dateProfileGenerator) {
    const daySeries = new DaySeries(dateProfile.renderRange, dateProfileGenerator)
    return new DayTable(daySeries, false)
}

const main = createPlugin({
    defaultView: 'timeGridWeek',
    views: {
        timeGrid: {
            class: TimeGridView$1,
            allDaySlot: true,
            slotDuration: '00:30:00',
            slotEventOverlap: true // a bad name. confused with overlap/constraint system
        },
        timeGridDay: {
            type: 'timeGrid',
            duration: { days: 1 }
        },
        timeGridWeek: {
            type: 'timeGrid',
            duration: { weeks: 1 }
        }
    }
})

export default main
export { TimeGridView as AbstractTimeGridView, TimeGrid, TimeGridSlicer, TimeGridView$1 as TimeGridView, buildDayRanges, buildDayTable }
