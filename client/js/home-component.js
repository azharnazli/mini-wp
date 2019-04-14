Vue.component(`home-component`, {
  props : ['filteredArticles'],
  methods : {
    fetchArticle() {
      axios.get(baseUrl + '/articles/findAll')
        .then(({
          data
        }) => {
          this.articles = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  template : 
  ` 
  <div>
    <div style="height: 20vh">
        <div class="flex-center flex-column">
          <h1 class="animated fadeIn mb-2">Welcome</h1>

          <h5 class="animated fadeIn mb-1">Here's a hearty welcome, big and warm enough to encompass you all!</h5>

          <p class="animated fadeIn text-muted">MINIWP</p>
        </div>
    </div>
  
    <div class="container mt-5 border mb-5">
    <div class="" style="min-height: 30vh">

      <div v-if="filteredArticles.length === 0" >
        <div style="height:60vh" >
          <h1 class="text-center" >No Article was Written</h1>
        </div>
        </div>
      <div v-else>
        <div v-for="(article, index) in filteredArticles">
          <div class="border-bottom text-left h3">Author: {{ article.user.first_name +" "+ article.user.last_name}}</div>
          <div class="border-bottom text-center h3">{{ article.title }}</div>
          <div v-if="article.imgPath">
            <img style="max-height: 50vh; width: 100%; object-fit: contain" :src="article.imgPath" alt="image">
          </div>
          <div class="text-justify border-top" v-html="article.content"></div>
          <div class="row">
          </div>
      </div>
    </div>

    </div>
   </div> 
  </div>`
})