<script steup>


</script>
<template>
  <!-- <button class="btn" >按钮</button> -->
  <router-view></router-view>
</template>

<style>
* {
  touch-action: none;
}
/* .btn{
  @apply bg-purple-500 text-indigo-100 px-4 rounded-full hover:(bg-purple-900) transition-all duration-500 focus:(ring-4 ring-purple-900);
  } */
#nprogress .bar{
  background-color: #f4f4f4;
  height:3px!important
}
body{
  @apply bg-gray-100;
}
::-webkit-scrollbar{
  width:4px;
  height:6px;
}
::-webkit-scrollbar-corner{
  display: block;
}
::-webkit-scrollbar-thumb{
    border-radius: 8px;
    background-color: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-thumb,
::-webkit-scrollbar-track{
    border-right-color: transparent;
    border-left-color: transparent;
    background-color: rgba(0,0,0,0.1);
}
</style>
