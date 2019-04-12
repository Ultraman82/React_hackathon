curl -H "Content-Type: application/json" -X POST "https://exp.host/--/api/v2/push/send" -d '{
"to": "ExponentPushToken[1JJC4_JyVEDCdQAJRHukH2]",
  "data": {
      "id": 1,
      "title": "Serving and casher is wanted.",
      "wage": "18$",
      "fromdate": "2019-04-08",
      "todate": "2019-04-08",
      "fromtime": "12:00",
      "totime": "20:00",
      "b_name": "Safe way",
      "b_address": {
      "b_address_1": "5877 Jarvis Ave",
      "b_address_2": "asd",
      "b_city": "asd",
      "b_state": "CA",
      "b_postcode": "asd"x
    },
      "b_phone": "614-615-4082",
      "b_email": "ewe@ffd.com",
      "b_detail": "Lets Work Hard!!!",
      "position": [
          "dancer"
        ]
    },
    "title": "You got a new job offer!",
    "body": "Restrante Confusion, Serving position 16$",
    "sound": "default",
    "vibrate": "defalut"
  }'

cellphone: "ExponentPushToken[1JJC4_JyVEDCdQAJRHukH2]",
laptop: "ExponentPushToken[LXAK5uGzs9py4meqrJBMmC]",



{ 
  "info":
  { "statuscode": 0, "copyright": 
    { "text": "\u00A9 2019 MapQuest, Inc.",
      "imageUrl": "http://api.mqcdn.com/res/mqlogo.gif",
      "imageAltText": "\u00A9 2019 MapQuest, Inc."
    },
    "messages": []
  },
  "options": 
    { "maxResults": -1,
      "thumbMaps": true,
      "ignoreLatLngInput": false
    },
  "results":
   [
     {
       "providedLocation":{
          "location": "5877 jarvis ave"
        },
        "locations":
        [
          { 
            "street": "5877 Jarvis Ave",
            "adminArea6": "",
            "adminArea6Type": "Neighborhood",
            "adminArea5": "Newark",
            "adminArea5Type": "City",
            "adminArea4": "Alameda",
            "adminArea4Type": "County",
            "adminArea3": "CA",
            "adminArea3Type": "State",
            "adminArea1": "US",
            "adminArea1Type": "Country",
            "postalCode": "94560-1251",
            "geocodeQualityCode": "P1AAA",
            "geocodeQuality": "POINT",
            "dragPoint": false,
            "sideOfStreet": "L",
            "linkId": "r7786696|p22940116|n9530903",
            "unknownInput": "",
            "type": "s",
            "latLng":
              {
                "lat": 37.551273,
                "lng": -122.048712 },
            "displayLatLng": 
              {
                "lat": 37.551877,
                "lng": -122.049549
              },
              "mapUrl": "http://www.mapquestapi.com/staticmap/v5/map?key=VtVVSZ98vXO6vWYRj1fza9QhHqEgySJ6&type=map&size=225,160&locations=37.551273,-122.048712|marker-sm-50318A-1&scalebar=true&zoom=15&rand=-90695444"
          }
        ]
      }
    ]
}

