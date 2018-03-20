# Project Documentation

## Installing
### Required software 
**NPM** comes as a part of **Node.js**. To install **Node.js** follow the instructions located here:
https://nodejs.org/en/

Once the node is installed, update the npm to the latest version
```
npm install npm@latest -g
```

### Installation process
Once you have pulled the source files, go to the root folder and run the following commands:
```
yarn install
```
followed by
```
npm install -g bower (might need to close and restart command line if you use windows)
bower install
```

This will install all of the remaining modules required for the project

## Running
```
gulp serve
```
this will perform the dev buid and open the project in the browser. The task stays running to watch for file changes, automatically builds and injects all of the changed files into your browser.

## Building
```
gulp
```
this will perform the production build. All of the built assets will be automatically placed in the corresponding subfolders of the `dist/` folder.

You can preview the production build in the browser by running:
```
gulp serve:dist
```
This will build the dist and present it in the browser

## Under the Bonnet

This project is based on the **Web App generator** from the **Yeoman** team

https://github.com/yeoman/generator-webapp

## Notes

The work was pretty much straightforward apart of the assets: the sizes didn't match up the design. Rather than having the browser to resize the images on the go, I resized them using Photoshop, that's always better - browser performance and image quality. However, this is still not optimal: we should be resizing the hi-res assets directly to the required size in order to provide best image quality.

The player's photos overlap the red background 1px. I assumed that it is a design feature ;) I had to crop the player's photos as they came with random padding.

The squarish badges won't fit in the space provided, the corners will get cut off. I already had to come up with a bit of workaround for Arsenal. The design needs to be revisited. Also, it would really help to have the sprites on a transparent background.

It took a bit more time than expected, mostly due to the build setup, I've never used this seed before, there have been some configuration issues as always. Also fiddling with the assets took a bit of time. All in all, I'm happy with the final build, it looks good :)