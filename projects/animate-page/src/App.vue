<template>
  <full-page ref="fullpage" :options="options" id="fullpage">
    <div class="section">
      <div class="item">First section ...</div>
    </div>
    <div class="section">
      <div class="item">Second section ...</div>
    </div>
  </full-page>
</template>

<script>

import "./App.css"
export default {
  name: 'app',
  data() {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu',
        scrollOverflow: true,
        scrollBar: false,
        anchors: ['page1', 'page2', 'page3'],
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
      },
    }
  }
}
</script>

<style>

</style>
