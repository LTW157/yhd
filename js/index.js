
$(function(){
    new Lunbo('.lunbo')
})



// lunbo plugin
;+function($){
    function Lunbo(selector){
        this.init(selector)
    }
    $.extend(Lunbo.prototype,{
        init: function(selector){
            this.ele = null
            if( typeof selector !== 'string' || (this.ele = $(selector)).length === 0 )
                return console.warn("请输入符合规则的参数")
            this.ul = this.ele.children('ul')
            this.ol = this.ele.children('ol')
            this.left = this.ele.children('span:eq(0)')
            this.right = this.ele.children('span:eq(1)')
            this.num = this.ele.children('ul').children().length
            this.index = 0
            this.timer = null
            this.init_style()
            this.autoplay()
            this.bindEvent()
        },
        init_style: function(){
            //创建ol里的li元素
            $.each(this.ul.children(),function(){
                this.ol.append($('<li></li>'))
            }.bind(this))
            this.ol.children().first().addClass('current')
            //计算初始化ol的margin-left位置
            this.ol.css({
                marginLeft: function () {
                    return -this.num * this.ol.children()[0].offsetWidth
                }.bind(this)
            })
            //复制第一张图片到ul里的最后,实现无缝轮播效果
            this.ul.append(this.ul.children().first().clone(true))
            //加动画
            this.ul.find('img').css({ transition:"all .5s" })
        },
        bindEvent: function(){
            this.ele.on('mouseenter',$.proxy(this.stop_autoplay,this))
            this.ele.on('mouseleave',$.proxy(this.autoplay,this))
            this.left.on('click',$.proxy(this.left_click,this))
            this.right.on('click',$.proxy(this.right_click,this))
            this.ol.children().each(function(_index,ele){
                $(ele).on('mouseenter',this.menu_list.bind(this,_index))
            }.bind(this))
        },
        left_click: function(){
            if(this.index === 0){
                this.index = this.num
            }
            this.index--
            this.move()
        },
        right_click: function(){
            this.index++
            if(this.index === this.num){
                this.index = 0
            }
            this.move()
        },
        menu_list: function(_index){
            this.index = _index
            this.move()
        },
        move: function(){
            this.ul.find('img').css({ opacity:0 })
            this.ul.find('img:eq('+ this.index +')').css({ opacity:1 })
            this.ol.children().removeClass('current')
            this.ol.children(':eq('+ this.index +')').addClass('current')
        },
        autoplay: function(){
            this.timer = setInterval(function(){
                this.right_click()
            }.bind(this),1200)
        },
        stop_autoplay: function(){
            clearInterval(this.timer)
        }
    })
    window.Lunbo = Lunbo
}(jQuery)
// lunbo plugin end