<template>
    <div>
       <h1>{{titulo}}</h1>
       
       <input type="search" class="filtro" placeholder="filte pelo titulo da imagem" v-on:input="filtro = $event.target.value" />
       {{filtro}}
       <ul>
         <li v-for="(foto, i) of fotos" :key="i">
            <meu-painel :titulo="foto.titulo">
              <img :src="foto.url" :alt="foto.descricao">
            </meu-painel>
         </li>
       </ul>
    </div>
</template>

<script>

import Painel from './components/shared/Painel.vue';

export default {
    data(){
      return{
        
          titulo: "Vue pic",
          fotos: [],
          filtro: ""
      }
    }, 
    components: {
      'meu-painel': Painel
    },
    created(){
      let promise = this.$http.get('http://localhost:3000/v1/fotos');

      promise
      .then(res =>  res.json())
      .then(fotos => this.fotos = fotos, err => console.log(err));
    }
  }
  
</script>

<style>
  .filtro {
    display: block;
    width: 100%;
  }
</style>
