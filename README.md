# Twitch Browser Extension

An extension I'm working on to explore the New Twitch API. This extension allows users to track and get notified when their favorite streamers go live.

[Follow my progress!](https://trello.com/b/MOA8mxeH/twitch-chrome-stream-updater)

## Requirements
### MVP
- Popup that lists all live twitch streams that users put on watch lists
- Extension Icon has a red dot for an indicator if new streams are live

### Stretch
- Log in with twitch account to populate watch list
- Chrome popup notification

## User Flow
1. User opens popup
1. User adds stream to watch list
1. Extension listens to see when stream is live
1. Extension notifies user when new live streams are live with a badge on the icon

## Functional Design
1. Store watch list/uuid of streams in json file
  https://stackoverflow.com/questions/10011011/using-node-js-how-do-i-read-a-json-object-into-server-memory
1. Acquire webhooks of stored stream id’s on extension startup
1. When a user adds a stream it gets stored to the json file and the webhook gets created

## Software Design
- Startup Functions
  - Handles reading and writing of json files (1)
  - Kicks off Event Manager
- Event Manager Class
  - Handles setting up webhooks (2)
  - Receives updates from those webhooks and sends (or makes available) changes to UI Manager as needed
- UI Manager - Manages UI Changes
  - Manages changing logo
- Webhook Manager Class (2)
  - Handles single webhook
  - List of these owned by event manager class
  - Contains methods to notify Event Manager
