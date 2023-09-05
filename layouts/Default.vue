<template>
  <div class="h-screen w-full overflow-auto bg-slate-200">
    <header class="contents">
      <div class="contents">
        <Navbar class="sticky left-0" />
      </div>
    </header>
    <section class="contents">
      <div class="contents py-6 min-h-screen-75">
        <slot />
      </div>
      <Footer class="sticky left-0" />
    </section>
  </div>
</template>
