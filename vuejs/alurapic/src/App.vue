<template>
    <div>
       <h1>{{titulo}}</h1>
       
       <input type="search" class="filtro" placeholder="filte pelo titulo da imagem" v-on:input="filtro = $event.target.value" />
       {{filtro}}
       <ul>
         <li v-for="(foto, i) of fotosFiltradas" :key="i">
            <meu-painel :titulo="foto.titulo">
              <imagem-responsiva :url="foto.url" :titulo="foto.descricao"/>
            </meu-painel>
         </li>
       </ul>
    </div>
</template>

<script>

import Painel from './components/shared/Painel.vue';
import ImagemResponsiva from './components/shared/imagem-responsiva/ImagemResponsiva.vue';

export default {
    data(){
      return{
        
          titulo: "Vue pic",
          fotos: [],
          filtro: ""
      }
    }, 
    computed: {
      fotosFiltradas(){
        if(this.filtro){
          let expressao = new RegExp(this.filtro.trim(), 'i');

          return this.fotos.filter(foto => expressao.test(foto.titulo));
        } else {
          return this.fotos;
          }
      }
    },
    components: {
      'meu-painel': Painel,
      'imagem-responsiva': ImagemResponsiva
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
