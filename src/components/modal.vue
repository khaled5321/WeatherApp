<template>
    <Teleport to="body">
        <transition name="fade">
            <div v-if="showModal" class="absolute flex items-center w-full top-0 left-0 h-full bg-black bg-opacity-30">
                <div
                    class="inner flex flex-col w-[85vw] h-fit mx-auto bg-slate-100 rounded-md p-4 shadow-2xl font-semibold text-black">
                    <div class="flex flex-col gap-2">
                        <h2 class="text-xl text-[#458b7a]">About:</h2>
                        <p class="mb-3">
                            Vweather app allows you to track the current and
                            future weather of cities of your choosing.
                        </p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h2 class="text-xl text-[#458b7a]">How it works:</h2>
                        <ol class="list-decimal list-inside mb-3 flex flex-col gap-2">
                            <li>
                                Search for your city by entering the name into the
                                search bar.
                            </li>
                            <li>
                                Select a city within the results, this will take
                                you to the current weather for your selection.
                            </li>
                            <li>
                                Track the city by clicking on the "+" icon in the
                                top right. This will save the city to view at a
                                later time on the home page.
                            </li>
                        </ol>
                    </div>
                    <div class="flex flex-col gap-2">
                        <h2 class="text-xl text-[#458b7a]">Removing a city:</h2>
                        <p>
                            If you no longer wish to track a city, simply select
                            the city within the home page. At the bottom of the
                            page, there will be an option to delete the city.
                        </p>
                    </div>
                    <button @click="$emit('close-modal')"
                        class="self-center px-4 py-2 mt-4 bg-secondary rounded w-fit text-white">
                        Close
                    </button>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
defineProps({
    showModal: {
        type: Boolean,
        default: false,
    },
})

defineEmits(["close-modal"]);
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}


.fade-enter-active .inner {
    animation: bounce-in 0.5s;
}

.fade-leave-active .inner {
    animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>