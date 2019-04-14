Vue.component('myarticle-component', {
  props: ['myArticle','formArticle','addIdtoDelete'],
  template : 
  ` 
  <div>
    <div style="height: 20vh">
      <div class="flex-center flex-column">
        <h1 class="animated fadeIn mb-2">My Articles</h1>

       
      </div>
    </div>

  <div v-if="myArticle.length === 0" >
    <div style="min-height: 70vh;">
      <h1 class="text-center" >No Article was Written</h1>
    </div>
    </div>
  <div v-else>
      <div class="container mt-5 border">
        <div class="" style="min-height: 30vh">
          <div v-for="(article, index) in myArticle">
            <div class="border-bottom text-center h3">{{ article.title }}</div>
            <div v-if="article.imgPath">
              <img style="max-height: 50vh; width: 100%; object-fit: contain" :src="article.imgPath" alt="image">
            </div>
            <div class="text-justify mb-5" v-html="article.content"></div>
            <div class="row">
              <div class="col m8 s12">
                <p><button class="btn btn-sm  white border"
                    v-on:click.prevent="formArticle(article.title, article.content, article._id)"><b>EDIT</b></button>
                </p>
              </div>
              <div class="col m4 hide-small">
                <p><span class="btn btn-sm btn-danger  float-right"
                    v-on:click.prevent="addIdtoDelete(article._id)"><b>DELETE</b></span></p>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>`
})