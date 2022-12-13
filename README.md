Hello!

Check out this Medium article for more info!

https://medium.com/@joerhodev/surfing-the-ethereum-network-️-4120c079d836

1. host the contract monitor as a standalone API webservice
   - use the json-rpc as an evironment variable on the application
   - emits an event when a new contract is created ('new_contract')

2. host the discord bot as an observer.
   - watch for when the contract monitor finds a new contract (triggered event)
   - then the discord bot will relay a embed if the bot is turned on (/start)
   
client is the discord bot.
server is the contract monitor script that is hosted remotely as a web service.

I'll be updating with documentation soon.
