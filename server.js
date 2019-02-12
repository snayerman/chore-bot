const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const bot_id = process.env.BOT_ID || require('./bot.js');
const url = `https://api.groupme.com/v3/bots/post`

const date = new Date();
const current_day = date.getDay();

const chore_list = {
   "sunday"     : ["Dishes", "Kitchen - Counter", "Microwave", "Stove", "Kitchen - Floor"],
   "monday"     : ["Living - Table", "Living - Floor", "Living - Bench", "Dishes", "Living - Stands"],
   "tuesday"    : ["Couches", "Laundry", "Dishes", "Family - Floor", "Family - Table"],
   "wednesday"  : ["Toilet and Floor", "Bathroom - Counter and Mirror", "Toilet", "Bathroom - floor", "Bathroom - Counter and Mirror"],
   "thursday"   : ["Dishes", "Kitchen - Counter", "Day Off", "Stove", "Day Off"],
   "friday"     : ["Day Off", "Kitchen - Counter", "Day Off", "Day Off", "Day Off"],
   "saturday"   : ["Shower", "Day Off", "Shower", "Day Off", "Dishes"]
}

const days_map = {
   0: "Sunday",
   1: "Monday",
   2: "Tuesday",
   3: "Wednesday",
   4: "Thursday",
   5: "Friday",
   6: "Saturday"
}

const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

const fools = ["Derek", "Marshall", "John", "Bennett", "Cole"]

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
   res.send('Successful connection!')
})

app.get('/print_chores', (req, res) => {
   let str = `~~ Chores for ${days_map[current_day]} ~~`

   for(let i = 0; i < fools.length; i++) {
      let fool = fools[i];
      let day = days[current_day];
      let chores = chore_list[day];

      str += `\n${fool}: ${chores[i]}`
   }

   axios.post(url, {
      body: {
         "bot_id": bot_id, 
         "text": str,
      }
   }).then(resp => {
      res.send({"msg": "success"})
   }).catch(err => {
      res.status(400).send({"msg": "error"})
   })
})

app.listen(port, () => {
	console.log(`listening on port ${port}`)
})
