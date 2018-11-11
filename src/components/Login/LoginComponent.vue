<template>
    <el-container class="container">
        <div class="form-container">
            <el-form
                    :model="loginInfo"
                    :label-position="labelPosition"
                    class="login-form"
                    ref="form">
                <div class="login-header">
                    <div class="title">
                        Login
                    </div>
                </div>
                <el-form-item class="form-item">
                    <el-input
                            prefix-icon="el-input__icon el-icon-more"
                            class=" common input"
                            v-model="loginInfo.name"
                            autocomplete="off"
                            placeholder="UserName"
                            prepend=""
                    >
                    </el-input>
                </el-form-item>

                <el-form-item class="form-item">
                    <el-input
                            :type="typeOfPwd"
                            prefix-icon="el-input__icon el-icon-more"
                            v-model="loginInfo.Password"
                            autocomplete="off"
                            prepend=""
                            placeholder="password"
                            class=" common input"
                    >
                        <i slot="suffix"
                           class="el-input__icon el-icon-view"
                           @mouseup.prevent="hidePwd"
                           @mousedown.prevent="ShowPwd"
                           @mouseleave="isMouseLeaving"
                           style="font-size: 22px">
                        </i>
                    </el-input>
                </el-form-item>
                <el-form-item class="button-item">
                    <el-button class="button-primary" type="primary" @click="Login">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-container>
</template>

<script>
import { mapActions } from 'vuex'

const PWD = 'password'
const TEXT = 'text'
export default {
  data () {
    return {
      formLabelWidth: '360px',
      labelPosition: 'top',
      typeOfPwd: 'password',
      loginInfo: {
        name: '',
        Password: ''
      }
    }
  },
  created () {
    /* 设置一个对象记录它mousedown和mouseup的位移量, 不让他响应式  */
    this.positionReader = {}
  },
  methods: {
    Login () {
      let loginInfo = this.loginInfo
      this.loginByUserName(loginInfo).then(() => {
        this.$router.push({ path: '/student' })
      }).catch((err) => {
        this.$message.error(err)
      })
    },
    ShowPwd () {
      this.positionReader = {}
      this.positionReader.firstClick = true
      this.typeOfPwd = TEXT
    },
    hidePwd () {
      this.positionReader.secondClick = true
      this.typeOfPwd = PWD
    },
    /* 隐藏的时候有个问题 如果你鼠标按下的时候鼠标离开了这个元素 mouseup不会被触发 */
    isMouseLeaving () {
      if (!this.positionReader.secondClick && this.positionReader.firstClick) {
        this.typeOfPwd = PWD
      }
    },
    ...mapActions({
      loginByUserName: 'LoginByUsername'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
    @import "~@/assets/styles/varible.styl"
    .container
        position: fixed
        height: 100%
        width: 100%
        max-height: 1024px
        display: flex
        background-color: #2d3a4b
        justify-content: center
        .form-container
            display: flex
            justify-content: center
            align-items: center
            width: 100%
            .login-form
                border-radius: 6px
                min-height: 40%
                opacity: 0.97
                flex-basis: 40%
                padding: 25px
                .button-item
                    .button-primary
                        width:100%
                .form-item
                    border: 1px solid rgba(255, 255, 255, 0.1)
                    background: rgba(0, 0, 0, 0.1)
                    border-radius: 5px
                    color: #454545
                .login-header
                    font-size: 26px
                    color: #eee
                    margin: 0 auto 40px auto
                    text-align: center
                    font-weight: bold
</style>
