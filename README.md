# Module: MMM-TUZSAZaragoza
This [MagicMirror](https://github.com/MichMich/MagicMirror) module displays information about estimations for bus stops in the city of Zaragoza (Spain). Supports **English** (*en*) and **Spanish** (*es*).

<center><img src="https://github.com/rafagale/MMM-TUZSAZaragoza/blob/main/tuzsa-magicmirror.PNG" alt="Module screenshot" width="400"></center>

## Dependencies
- An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
- [Axios](https://www.npmjs.com/package/axios) (installed via `npm install`)

## Installation

Navigate into your MagicMirror's `modules` folder:
```
cd ~/MagicMirror/modules
```

Clone this repository:
```
git clone https://github.com/rafagale/MMM-TUZSAZaragoza
```

Navigate to the new `MMM-TUZSAZaragoza` folder and install the node dependencies.
```
npm install
```

Configure the module in your `config.js` file.

## Find your stop number
To configure this module, you will need a stop number which you want to get information about. The stop number can be found by looking for it at Zaragoza public transport website.  


[Zaragoza public transport website](https://www.zaragoza.es/sede/portal/movilidad/transporte/)


## Using the module

To use this module, add it to the modules array in the `config/config.js` file. 

```javascript
modules: [
  {
    module: 'MMM-TUZSAZaragoza',
    position: 'top_left',
    header: 'My bus stop',
    config: {
      stopNumber: 325,
      updateInterval: 60 //in seconds
      fadeSpeed: 1000 //in miliseconds (set to 0 to disable fade animation)
    }
  },
]
```

## Configuration options

The following properties can be configured:

| Option                       | Description
| ---------------------------- | -----------
| `stopNumber`                 | ID number of the bus stop.<br><br>**Required**<br>**Value type:** `Integer`<br>**Default value:** `325`
| `updateInterval`             | Time (in seconds) to wait before refreshing the data from the API.<br><br>**Required**<br>**Value type:** `Integer`<br>**Default value:** `60`
| `fadeSpeed`                  | Time (in miliseconds) for the fade speed.<br><br>**Required**<br>**Value type:** `Integer`<br>**Default value:** `1000`



## Special Thanks
- [Michael Teeuw](https://github.com/MichMich) for creating the awesome [MagicMirror2](https://github.com/MichMich/MagicMirror/tree/develop) project that made this module possible.
- [TheRaulXP](https://github.com/raulbalanza) for creating the [MMM-EMTValencia](https://github.com/raulbalanza/MMM-EMTValencia) module that I used as guidance in creating this module.

