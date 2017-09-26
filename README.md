# swiper-demo
**布局原理：**
- swipper-container相对定位relative，宽度仅为一张图片的宽度，超出的部分全部hidden
- swipper-container中的元素绝对定位absolute，其中图片列表lists的z-index为1，前进后退按钮和底部选择按钮z-index为2.图片列表lists的内容float平铺
- lists通过left属性的定位来轮播某一张图片
