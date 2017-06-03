<template>
<!--  <div class="list">
    <div v-for="button in buttons">
      <router-link v-bind:to="button.to" v-bind:class="{'active':button.isClick }" class="list-group-item" v-on:mouseover="Show(button)" v-on:mouseleave="Hide(button)">{{button.name}}</router-link>
    </div>
  </div>-->
</template>
<script>
  export default {
    name: 'list',
    data () {
      return {
        buttons: [
          {
            name: '按钮1',
            isClick: false,
            to: '/plain'
          },
          {
            name: '按钮2',
            isClick: false,
            to: ''
          },
          {
            name: '按钮3',
            isClick: false,
            to: ''
          }
        ]
      }
    },
    methods: {
      Show: function (button) {
        button.isClick = true
      },
      Hide: function (button) {
        button.isClick = false
      }
    }
  }

</script>
<!--
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
-->
