# Cancer count visualization

![Screenshot of cancer count visualization](https://cloud.githubusercontent.com/assets/9803285/13720276/49b18c18-e7b9-11e5-885a-696908e98cce.png)

You can interact with this data visualization at [ucsc-bio-delphine.meteor.com](http://ucsc-bio-delphine.meteor.com).

## Bugs found in original code:

* Unnecessary closing bracket in var key declaration
* Unnecessary comma at end of 'patients' array
* 'return' written 'ret' at end of color_map function
* 'patients' array not declared with 'var'
* if statement inside color_map function should read 'if (!(key in value_color_map))'