<template>
  <NuxtLayout name="404">
    <div>
      <div class="text-9xl font-bold text-red-600">404</div>
      <div class="text-4xl mt-4">
        Uh-oh! You've entered a radiation alert zone.
      </div>
      <div class="text-6xl mt-8">
        <svg
          width="150px"
          height="150px"
          viewBox="0 0 72 72"
          xmlns="http://www.w3.org/2000/svg"
          class="block mx-auto"
        >
          <g>
            <circle cx="36" cy="35" r="23" fill="#f4aa41" />
          </g>
          <g>
            <ellipse
              cx="35.96"
              cy="35.89"
              rx="3.281"
              ry="3.281"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.25"
            />
            <path
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.254"
              d="m23.09 43.42a14.76 14.76 0 0 0 3.496 4.097l5.791-6.957a5.733 5.733 0 0 1-2.167-3.753l-8.921 1.537a14.76 14.76 0 0 0 1.8 5.076z"
            />
            <path
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.254"
              d="m48.91 43.42a14.76 14.76 0 0 0 1.8-5.076l-8.921-1.537a5.733 5.733 0 0 1-2.167 3.753l5.791 6.957a14.76 14.76 0 0 0 3.496-4.097z"
            />
            <path
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.254"
              d="m36 21.13a14.76 14.76 0 0 0-5.296 0.9794l3.129 8.494a5.733 5.733 0 0 1 4.333 0l3.129-8.494a14.76 14.76 0 0 0-5.296-0.9794z"
            />
            <circle
              cx="36"
              cy="35"
              r="23"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </g>
        </svg>
      </div>
      <div class="mt-8">
        <button
          class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 text-2xl rounded-sm transition duration-300"
          @click="goBack()"
        >
          Return to Safety
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const router = useRouter();
const goBack = () => {
  router.push("/");
};
</script>
