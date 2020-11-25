<template>
	<view class="i-search-container" :style="{'background-color': bgcolor}" >
    <view class="i-search-box" :style="{'border-radius': radius + 'px'}" @click="searchHandler">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">search</text>
    </view>
		
	</view>
</template>

<script>
	export default {
    props:{
      bgcolor:{
        type:String,
        default: '#d11200'
      },
      radius:{
        type:String,
        default: '18'
      }
    },
		data() {
			return {
				
			};
		},
    methods:{
      searchHandler(){
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.i-search-container {
  // background-color: #d11200;
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
}

.i-search-box {
  height: 36px;
  background-color: #ffffff;
  // border-radius: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .placeholder {
    font-size: 15px;
    margin-left: 5px;
  }
}
</style>
