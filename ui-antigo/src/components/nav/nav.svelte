<script>
  export let navRef;
  export let title = "";
</script>

<div class="appContainer min-h-screen h-full">
  <!-- <MachineShifts {disPop} {popPe} {closePop} /> -->
  <nav
    id="nav"
    class="bg-light_white_nav shadow-lg flex justify-between items-center text-center p-4 h-[40px]"
  >

    <div class="navbar-title">
      <a href={navRef}>
        <img
          class="h-[28px] cursor-pointer"
          src="/static/logoAxonNoMargin.png"
          alt="logo"
        />
      </a>

        {title}
 
    </div>

  </nav>

  <slot />
</div>

<style>
  .navbar-title {
    display: flex;
    font-size: 20px;
    font-weight: bold;
  }

  a{
    margin-right: 10px;
  }

  #nav {
    position: relative;
    z-index: 9999;
    color: white;
  }
</style>
