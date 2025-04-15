Pull the code using:-

git clone https://github.com/santoshchauhan12/WeatherAppReactNativeNetW.git

Since it has node module dependency use below command to install it:-

- npm install

Run the Android build using below command on emulator:-

- npm run android

To successfully create the debug apk :- 

- npm run build:debug
  
(this will generate a app-debug.apk folder inside android/app/build/output/debug folder)


What is Contains:-

- Home page with weather report status
- Light/Dark mode button switch(which switches the theme color globally
- Saves the last searched city. (once app killed and repon then it shows the last search city weather report)
- Show error placeholder if city name not found.
- Show error placeholder on first time to alert user to enter the city for any weather report.
- Shows internet unavailable error, if user is offline.
- Search starts once user starts typing and triggers on every 1.5 second wait.

Architecture Explanation:-

- Each page  are segregated into separated screen module.
- Reusable components like errors and placeholders are segregated into components.
- Condition based coloring and styling are placed into helper module.
- Global styling is used instead of inline styling, for scalability.
- Styling are segragated based , sizing, margin, padding, positioning, coloring.
- Use context api for storing and getting themes, styling and colors.
- Used conext api for network state storing, listening and fetching.
- Created a base api for placing apis.
- Used Redux toolkit and Store for global api call, reducer and  managing the state of weather report.
- Slice, thunk and Response model types are segragated into feature module.
- Use Eslint for clean code and performance.
- Used env for keeping the api keys.
- Custom hooks are used for fetching the weather state, theme state.
- Jest and @testing-library/react-native is used for testing


![WhatsApp Image 2025-04-11 at 4 32 26 PM](https://github.com/user-attachments/assets/0446d0e5-d2e9-4667-9b6a-e17abf8fbc79)
![WhatsApp Image 2025-04-11 at 4 32 26 PM (1)](https://github.com/user-attachments/assets/fa9f71da-1e69-4d31-bfc0-767f13a45b5b)
![WhatsApp Image 2025-04-11 at 4 32 27 PM](https://github.com/user-attachments/assets/792b7101-2d46-439d-8f89-a1d7b9da8851)
![WhatsApp Image 2025-04-11 at 4 32 23 PM](https://github.com/user-attachments/assets/0918c638-eba4-48c3-8ae4-dbb0d132941d)
![WhatsApp Image 2025-04-11 at 4 32 24 PM](https://github.com/user-attachments/assets/43c6d6e1-2b71-447b-8d8d-138c048493c0)
![WhatsApp Image 2025-04-11 at 4 32 24 PM (1)](https://github.com/user-attachments/assets/5e235900-9e9d-405c-9186-eb879c2cfb99)
![WhatsApp Image 2025-04-11 at 4 32 25 PM](https://github.com/user-attachments/assets/915dd6e3-b639-41dc-a7de-e9e89d8a8e20)
![WhatsApp Image 2025-04-11 at 4 32 25 PM (1)](https://github.com/user-attachments/assets/6cc2384e-aa2e-4efa-823d-88923d1c38b3)
