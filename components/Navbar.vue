<template>
  <nav
    class="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
  >
    <div class="flex w-full flex-wrap items-center justify-between px-3">
      <!-- Hamburger button for mobile view -->
      <button
        class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
        type="button"
        @click="toggleMobileMenu"
      >
        <!-- Hamburger icon -->
        <span class="[&>svg]:w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="h-7 w-7"
          >
            <path
              fill-rule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <!-- Collapsible navigation container -->
      <Transition name="mobile-navbar">
        <div
          v-show="showMobileMenu"
          class="flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
        >
          <!-- Logo -->
          <NuxtLink
            class="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            to="/"
          >
            <img
              src="https://freesvg.org/img/IncessantBlabber-Radioactive-symbol.png"
              class="h-7"
              alt="RadBioPhys"
            />
          </NuxtLink>
          <!-- Left navigation links -->
          <ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row">
            <li class="mb-4 lg:mb-0 lg:pr-2">
              <!-- Home link -->
              <NuxtLink
                class="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                to="/"
                >Home</NuxtLink
              >
            </li>
            <!-- About link -->
            <li class="mb-4 lg:mb-0 lg:pr-2">
              <NuxtLink
                class="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                to="/about"
                >About</NuxtLink
              >
            </li>
          </ul>
        </div>
      </Transition>

      <!-- Right elements -->
      <div class="relative flex items-center">
        <!-- Cart Icon -->
        <NuxtLink
          class="mr-4 text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
          to="http://radbiodb.physics.ntua.gr/"
        >
          RadBioBase
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
const showMobileMenu = ref(false);
const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};
</script>
<style scoped lang="scss">
.mobile-navbar-leave-active, .mobile-navbar-enter-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.mobile-navbar-enter, .mobile-navbar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.mobile-navbar-enter-to {
  transform: translateY(-3%);
  opacity: 1;
}

</style>
