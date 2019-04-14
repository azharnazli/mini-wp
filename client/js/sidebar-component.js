Vue.component('sidebar-component', {
  created() {
    this.fetchQuote()
    this.fetchHoliday()
  },
  data : function() {
    return {
      quotes : '',
      holidays : []
    }
  },
  methods: {
    fetchQuote() {
      axios.get('https://thesimpsonsquoteapi.glitch.me/quotes')
        .then(({data})=> {
          this.quotes = data[0].quote
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchHoliday()  {
      axios.get(`https://calendarific.com/api/v2/holidays?country=ID&year=2019&api_key=201a2d6d63b6265aa5840da370093fb3fd8fc53b`)
        .then(({data}) => {
          this.holidays  = data.response.holidays
        })
    }
  },
  template: `<div class="container">
  <div class="modal left fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="nav flex-sm-column flex-row">
            <div class="border">
              <h3>Quotes</h3>
              <p>{{ quotes }}</p> 
            </div>  
          </div>
          <h3> Upcoming Holidays </h3>
          <div v-for=" holiday in holidays">
            <div v-if="holiday.date.iso > new Date().toISOString()" >
              <div class="border p-2" >
                <p class="text-primary" >{{ holiday.name }}</p>
                <p class="" >{{holiday.date.iso.slice(0,10) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</div>`
})