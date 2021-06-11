# Speedometer Mobile App
[![Breadbox.io](http://i.imgur.com/vAw3l8H.png)](http://breadbox.io)

A mobile application built using React Native and the [Expo SDK](https://docs.expo.io/versions/v21.0.0/sdk/index.html#expo-sdk).

[![Speedometer](https://i.imgur.com/ni6pleo.jpg)](http://breadbox.io)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### Expo XDE
You'll need to download and install the Expo XDE for development and publishing the application to the Expo library.  Download the latest version of Expo XDE for [macOS](https://xde-updates.exponentjs.com/download/mac), [Windows (64-bit)](https://xde-updates.exponentjs.com/download/win32), or [Linux](https://xde-updates.exponentjs.com/download/linux-x86_64).

#### Node.js & Node Package Manager
You'll need to download and install Node.js version 6 or higher and Node Package Manager for installing dependencies.  Node Package Manager is installed when installing Node.js.  Download the latest version of Node.js for [macOS](https://nodejs.org/dist/v6.11.0/node-v6.11.0.pkg) or [Windows (64-bit)](https://nodejs.org/dist/v6.11.0/node-v6.11.0-x86.msi).

### Installing

First, you'll need to clone this repo to your working directory on your local machine.  Second, install the project dependencies using Node Package Manager through the command line.

Then you'll open that directory in Expo XDE by clicking *"Project"* in the top, left-hand corner of the Expo XDE, then selecting *"Open Project"* from the dropdown.  And finally, navigate to the cloned directory and select it.

#### Installing Dependencies

1. Open your command line.
2. Navigate to your working directory.
3. Clone this repo to your working directory.
4. Navigate inside the speedometer-app directory.
5. Install the dependencies.

```
cd /path/to/working/directory
hg clone https://jschroeder1@bitbucket.org/breadboxio/speedometer-app
cd /speedometer-app
npm install
```

## Starting the Application

1. After installation completes, open the Expo XDE application.
2. In the Expo XDE application, click *"Project"* in the top, left-hand corner. This will open a dropdown.
3. Select *"Open Project"* from the dropdown.  This will open a file browser.
4. Navigate to your working directory in the file broswer and select the speedometer-app folder.
5. Click *"Open"* in the file browser.  The application will start running in the Expo XDE.

**Note:** *Make sure Expo XDE is running in "Development Mode."  You can enable Development Mode by clicking the gear icon on the left-hand side of the Expo XDE host path field and clicking "Development Mode."*

You should see something similar to the following running on the left-hand side of Expo XDE:

```
9:33:31 AM
Starting React Native packager...
9:33:33 AM
Scanning 550 folders for symlinks in /path/to/working/directory/speedometer-app/node_modules (7ms)
9:33:34 AM
Loading dependency graph.
9:33:34 AM
Running packager on port 19001.
9:33:34 AM
9:33:38 AM
Dependency graph loaded.
9:33:44 AM
Project opened! You can now use the "Share" or "Device" buttons to view your project.
```
Now the project is up and running.  You can view the application on your local machine the using iOS Simulator or Genymotion Android simulator. You can also view the application on a physical device by clicking the *"Share"* button on the top, right-hand side of the Expo XDE and scanning the QR code with your mobile device.

## Development

During development you can use simulators with live reloading to run the application.

### Using the iOS Simulator

The iOS Simulator comes packaged with the Apple xCode Developer Tools and can be downloaded for free from the macOS App Store.  Once installed, Expo XDE will be able to automatically install Expo Client onto the simulator application then run/live-reload the application during development.

#### Installation

The iOS Simulator is bundled with Apple xCode.  You can download and install xCode from the Mac App Store [here](https://itunes.apple.com/us/app/xcode/id497799835?mt=12).

#### Running

Once xCode is installed and the project is running in Expo XDE you can open the project in the iOS simulator by clicking the *Device* button.  This will open a dropdown menu.  Select *"Open on iOS Simulator"* from the dropdown menu.  This will download and install [Expo Client](https://itunes.apple.com/us/app/expo-client/id982107779?mt=8) onto the iOS Simulator.  Once installation is complete, the project will automatically open.

### Using the Genymotion Android Simulator

#### Installation

1. Install VirtualBox
2. Install GenyMotion free for desktop
3. Open GenyMotion, make a new virtual machine
4. Go to Genymotion settings/ADB
5. select Use Custom Android SDK tools
6. Change Android SDK path to “/Users/joey/Library/Android/sdk”
7. add “export PATH=$PATH:/Users/joey/Library/Android/sdk/platform-tools/“ to the end of your .zshrc file, or run: `echo "export PATH=\$PATH:/Users/${USER}/Library/Android/sdk/platform-tools/" >> ~/.zshrc` in terminal
8. run `npm i -g exp`
9. run `exp path`
10. Open Genymotion
11. start android device simulator from your Genymotion virtual devices
12. open expo XDE
13. once app is built, open on Android Device

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

### Building the Standalone App

An Apple Developer account is needed to build the iOS standalone app, but a Google Play Developer account is not needed to build the Android standalone app. If you’d like to submit to either app store, you will need a developer account on that store.

#### Install `exp`

Expo XDE currently doesn’t include an option for building a standalone app, so we’ll need `exp` for this. Run `npm install -g exp` to get it.
If you haven’t used `exp` before, the first thing you’ll need to do is login with your Expo account using `exp login`.

```
npm i exp -g
exp login
```

#### Start the Build

Run `exp start` in your app directory to boot up the Expo packager. This is necessary because during the build process your app will be republished to ensure it is the latest version.

You should see something similar to the following running in your command line:

```
[exp] Making sure project is set up correctly...
[exp] Your project looks good!
[exp] Using project at /speedometer-app
[exp] Starting React Native packager...
[exp] Scanning 602 folders for symlinks in /speedometer-app/node_modules (5ms)
[exp] Loading dependency graph.
[exp] Running packager on port 19001.
[exp] Dependency graph loaded.
[exp] Expo is ready.

[exp] Your URL is

exp://xh-bex.schrjos.speedometer-app.exp.direct:80

[exp] Logs for your project will appear below. Press Ctrl+C to exit.
```

##### Building for iOS

With `exp` running the project, open a new comand line and run `exp build:ios`.  The first time you build the project You will be prompted for your Apple ID and password for your developer account, and your Apple Team ID. This is needed to manage certificates and provisioning profiles, so we can build and send off push notifications.

You should see something similar to the following running in your command line:

```
[exp] Making sure project is set up correctly...
[exp] Your project looks good!
[exp] Checking if current build exists...

[exp] No currently active or previous builds for this project.
[exp] Checking for existing Apple credentials...

We need your Apple ID/password to manage certificates and provisioning profiles from your Apple Developer account.
? What's your Apple ID?

? Password?

? What is your Apple Team ID (you can find that on this page: https://developer.apple.com/account/#/membership)?

[exp] Validating Apple credentials...
[exp] Credentials valid.

? Do you already have a distribution certificate you'd like us to use,
or do you want us to manage your certificates for you? true

[exp] Generating distribution certificate...
[exp] Distribution certificate setup complete.
[exp] Validating app id...

? Do you already have a push notification certificate you'd like us to use,
or do you want us to manage your push certificates for you? true

[exp] Fetching a new push certificate...
[exp] Push certificate setup complete.
[exp] Starting build process...
[exp] Publishing...
[exp] Building iOS bundle
[exp] Building Android bundle
[exp] Analyzing assets
[exp] Uploading assets
[exp] No assets changed, skipped.
[exp] Uploading JavaScript bundles
[exp] Published
[exp] Your URL is

https://exp.host/@schrjos/ride-or-die

[exp] Building...
[exp] Build started, it may take a few minutes to complete.
[exp] Build ID: bXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
[exp] Run `exp build:status` to monitor it.
```

After roughly five minutes, run `exp build:status` to get a link to download your assets.

```
[exp] Making sure project is set up correctly...
[exp] Your project looks good!
[exp] Checking if current build exists...

[exp] ============
[exp] Build Status
[exp] ============

[exp] iOS:
[exp] IPA: https://exp-shell-app-assets.s3-us-west-1.amazonaws.com/archive.ipa
```

Use the app link to download the .IPA file.


## Built With

* [Expo](https://expo.io/) - An SDK to help speed the React-Native development process
* [React-Native](https://facebook.github.io/react-native/) - A framework for building native apps using React

## To-Dos

* add Google Analytics
* fit route end points to the map when user goes to route page;
* fade out preloader
* set delay on preloader
* add animations to speedometer page
* add "Rate this App" button to About page
* test
* add ads

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Joey Schroeder** - *Initial work* - [Breadbox.io](https://github.com/BreadBoxIO)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [MIT Open Source Initiative](https://opensource.org/licenses/MIT) for details

## Acknowledgments

* Hat tip to anyone who's code was used
