<template>
<div id="popup">
  <div class="actions">
    <button @click="loadPDFs" class="load-button">Load PDFs</button>
    <button @click="downloadAll" class="download-button">Download All</button>
  </div>
  <div class="results">
    <div v-for="(item, idx) in patents" :key="idx" class="result-item">
      {{ item.title }}
    </div>
  </div>
</div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      patents: []
    }
  },
  methods: {
    loadPDFs () {
      let self = this
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.getSelected(null, function(tab) {
          chrome.tabs.sendMessage(tab.id, { greeting: 'getPatents' }, function(response) {
            self.patents = response.patents
          })
        });
      });
    },
    downloadAll () {

    }
  }
}
</script>

<style lang="scss">
html {
  width: 400px;
  height: 400px;
  background: lightgray;
}
#popup {
  .actions {
    display: flex;
    justify-content: center;
    button {
      background: rgb(255, 217, 0);
      border: 1px solid black;
      border-radius: 5px;
      padding: 5px 20px;
      margin: 10px 20px;
    }
  }
  .results {
    background: rgb(235, 235, 235);
    box-shadow: 1px 1px 5px rgb(216, 216, 216);
    height: 400px;
    overflow-y: auto;

    .result-item {
      padding: 5px 5px;
    }
    .result-item:nth-child(odd) {
      background: white;
    }

  }
}
</style>
