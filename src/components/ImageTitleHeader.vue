<template>
    <div class="cover-photo">
        <img :src="banner" alt="Cover Photo" :style="{ top: topValue }">
        <div class="position-absolute top-0 start-0 w-100 h-100 bg-soft-primary"></div>
        <div class="position-absolute top-50 start-50 translate-middle text-center text-white">
            <h1 class="mb-1 fw-bold text-white display-4" id="hero-title">
                {{ titleHeader }}
            </h1>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImageTitleHeader',
    props: {
        banner: String, titleHeader: String, topValue: String
    }
}
</script>
<style @scope>
.cover-photo {
    position: relative;
    width: 100%;
    height: 300px;
    /* Set the height of your cover photo container */
    overflow: hidden;
    /* Hide overflowing content */
}

.cover-photo img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Center the image */
}
</style>