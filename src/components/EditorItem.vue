<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align: left"></div>
  </div>
</template>
<script>
// 引入编辑器
import E from 'wangeditor'
export default {
  name: 'editorElem',
  data () {
    return {
      editor: null,
      editorContent: ''
    }
  },
  // 接收父组件的方法
  props: ['catchData', 'content'],
  watch: {
    content () {
      this.editor.txt.html(this.content)
    }
  },
  mounted () {
    this.editor = new E(this.$refs.editorElem)
    console.log('this.editor====>', this.editor)
    this.editor.config.onchange = (html) => {
      this.editorContent = html
      // 把这个html通过catchData的方法传入父组件
      this.catchData(this.editorContent)
    }
    this.editor.config.uploadImgServer = '你的上传图片的接口'
    this.editor.config.uploadFileName = '你自定义的文件名'
    this.editor.config.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]

    this.editor.config.uploadImgHooks = {
      before: function (xhr, editor, files) {
        // 图片上传之前触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
        // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
        // return {
        //     prevent: true,
        //     msg: '放弃上传'
        // }
      },
      success: function (xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        this.imgUrl = Object.values(result.data).toString()
      },
      fail: function (xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function (xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function (xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },

      // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
      // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
      customInsert: function (insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        const url = Object.values(result.data) // result.data就是服务器返回的图片名字和链接
        JSON.stringify(url) // 在这里转成JSON格式
        insertImg(url)
        // result 必须是一个 JSON 格式字符串！！！否则报错
      }
    }

    this.editor.create() // 创建富文本实例
    if (!this.content) {
      this.editor.txt.html('请编辑内容1')
    }
  }
}
</script>
