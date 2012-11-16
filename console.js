var jsconsole = {
    con : {},
    id :'debug',
    enabled : false,
    name : 'js_debug',
    width : 350,
    height : 500,
    left : 50,
    top : 0,
    menubar : 'no',
    status : 'no',
    location : 'no',
    toolbar : 'no',
    scrollbars : 'yes',
    init : function(name) {
        this.name = name; // name our console
        this.enabled = true; // enable debug output
        return this;
    },
    open : function() {
        if(!this.enabled) return;
        this.con=window.open('',this.name,
             ' width='+this.width+
             ',height='+this.height+
             ',menubar='+this.menubar+
             ',status='+this.status+
             ',location='+this.location+
             ',toolbar='+this.toolbar+
             ',scrollbars='+this.scrollbars+
             ',left='+this.left+
             ',top='+this.top+
             ',directories=no'+
             ',dependent=yes'+
             ',alwaysRaised=yes');
        if (this.con.opener === null) this.con.opener = self;

        this.con.document.body.innerHTML='';
        this.con.document.write('<html><head><title>JS Debug Console</title>');
        this.con.document.write('<script type="text/javascript">\nfunction getobj(o) {\nif (document.getElementById) return document.getElementById(o)\nelse if (document.all) return document.all.o;\n}\nfunction getwidth(){\nvar w;\nif( typeof( window.innerWidth ) == "number" ) {\nw = window.innerWidth;}\nelse if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {\nw = document.documentElement.clientWidth;}\n else if( document.body && ( document.body.clientWidth ||document.body.clientHeight ) ) {w = document.body.clientWidth;} return w;}\nfunction widen(w) {\ngetobj("controllers").style.width=w-15;\ngetobj("status").style.width=w-25;\ngetobj("output").style.width=w-25;\n}\nfunction resize() {\n widen(getwidth()); \n}\n</script>\n');
        this.con.document.write('</head><body onresize="resize();">'+
           '<div id=controllers style="position:fixed; top:0px; width:'+(this.width-15)+'px; height: 30px; z-index: 10;background-color:#555; layer-background-color:#555;font-size:5px;">'+
           '&nbsp;<br>&nbsp;<input type=button value="Clear" onclick="window.opener.'+this.id+'.clearconsole();">&nbsp;'+
           '<input type=button value="Reload Parent" onclick="window.opener.location.reload();">'+
           '<input type=button value="Close" onclick="window.close();">'+
           '</div>'+
           '<div id=status style="position: absolute; top: 30px; font-family: Tahoma;font-size: 10px; color: #f00;text-align: left; width:'+(this.width-25)+'">'+
           '<b>Debug Console Started...</b><br></div>');
        this.con.document.write('<pre><div name=output id=output style="position: absolute; top: 45px; font-family: Tahoma;font-size: 9px;color: #333; text-align: left; width:'+(this.width-25)+'">');
            this.con.document.write('</div></pre></body></html>');
    },
    getobj : function(o) {
        if(!this.enabled) return;
            if (this.con.document.getElementById)
                return this.con.document.getElementById(o);
            else if (this.con.document.all)
                return this.con.document.all.o;
    },
    clearconsole : function() {
        if(!this.enabled) return;
            this.getobj('output').innerHTML='';
    },
    log : function(data) {
        if(!this.enabled) return;
        if(this.con.closed) return;
        this.getobj('output').innerHTML+=data;
        this.getobj('output').innerHTML+='\n';
    }
}
