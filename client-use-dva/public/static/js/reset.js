
(function(window,document){
    var remcss={};
    (function(){
        var viewportEl=document.querySelector('meta[name="viewport"]'),
            dpr=window.devicePixelRatio||1,
            maxWidth=750,designWidth=750,
            content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no';
        dpr=dpr>=3?3:(dpr>=2?2:1);
        remcss.dpr=dpr;
        remcss.maxWidth=maxWidth;remcss.designWidth=designWidth;remcss.content=content;
        document.documentElement.setAttribute('data-dpr',dpr);
        document.documentElement.setAttribute('max-width',maxWidth);
        if(designWidth){
            document.documentElement.setAttribute('design-width',designWidth);
            remcss.designWidth=designWidth
        }
        if(viewportEl){
            viewportEl.setAttribute('content',remcss.content)
        }else{
            viewportEl=document.createElement('meta');
            viewportEl.setAttribute('name','viewport');
            viewportEl.setAttribute('content',remcss.content);
            document.head.appendChild(viewportEl)
        }
    })();
    remcss.setFontsize=function(){
        var innerWidth=document.documentElement.getBoundingClientRect().width||window.innerWidth;
        if(remcss.maxWidth&&(innerWidth/remcss.dpr>remcss.maxWidth)){
            innerWidth=remcss.maxWidth*remcss.dpr
        }
        if(!innerWidth){
            return false
        }
        document.documentElement.style.fontSize=(innerWidth*100/remcss.designWidth)+'px';
        remcss.callback&&remcss.callback()};remcss.setFontsize();
    window.addEventListener('resize',function(){clearTimeout(remcss.restime);
        remcss.restime=setTimeout(remcss.setFontsize,100)},false);
    window.addEventListener('DOMContentLoaded',remcss.setFontsize,false);
    window.remcss=remcss})(window,document);
