function css_beautify(v,f){function b(){return n=v.charAt(++d)}function t(a){for(var C=d;b();)if("\\"==n)b(),b();else if(n==a)break;else if("\n"==n)break;return v.substring(C,d+1)}function w(){for(var a=d;C.test(v.charAt(d+1));)d++;return d!=a}function g(){var a=d;do;while(C.test(b()));return d!=a+1}function h(){var a=d;for(b();b();)if("*"==n&&"/"==v.charAt(d+1)){d++;break}return v.substring(a,d+1)}var f=f||{},m=f.indent_size||4,a=f.indent_char||" ";"string"==typeof m&&(m=parseInt(m));var C=/^\s+$/,
d=-1,n,x=v.match(/^[\r\n]*[\t ]*/)[0],a=Array(m+1).join(a),G=0;print={};print["{"]=function(a){print.singleSpace();r.push(a);print.newLine()};print["}"]=function(a){print.newLine();r.push(a);print.newLine()};print.newLine=function(a){if(!a)for(;C.test(r[r.length-1]);)r.pop();r.length&&r.push("\n");x&&r.push(x)};print.singleSpace=function(){r.length&&!C.test(r[r.length-1])&&r.push(" ")};var r=[];for(x&&r.push(x);;){var q=g();if(!n)break;"{"==n?(G++,x+=a,print["{"](n)):"}"==n?(G--,x=x.slice(0,-m),print["}"](n)):
'"'==n||"'"==n?r.push(t(n)):";"==n?r.push(n,"\n",x):"/"==n&&"*"==v.charAt(d+1)?(print.newLine(),r.push(h(),"\n",x)):"("==n?(r.push(n),w(),"url"==r.slice(-4,-1).join("").toLowerCase()&&b()&&(")"!=n&&'"'!=n&&"'"!=n?r.push(t(")")):d--)):")"==n?r.push(n):","==n?(w(),r.push(n),print.singleSpace()):("]"!=n&&("["==n||"="==n?w():q&&print.singleSpace()),r.push(n))}return r.join("").replace(/[\n ]+$/,"")}"undefined"!==typeof exports&&(exports.css_beautify=css_beautify);function html_beautify(v,f){var b,t,w,g,h,f=f||{};t=f.indent_size||4;w=f.indent_char||" ";h=f.brace_style||"collapse";g=f.max_char||"120";unformatted=f.unformatted||["a"];b=new function(){this.pos=0;this.token="";this.current_mode="CONTENT";this.tags={parent:"parent1",parentcount:1,parent1:""};this.token_text=this.last_token=this.last_text=this.token_type=this.tag_type="";this.Utils={whitespace:["\n","\r","\t"," "],single_token:"br,input,link,meta,!doctype,basefont,base,area,hr,wbr,param,img,isindex,?xml,embed".split(","),
extra_liners:["head","body","/html"],in_array:function(a,b){for(var d=0;d<b.length;d++)if(a===b[d])return!0;return!1}};this.get_content=function(){for(var a="",b=[],d=!1;"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];a=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(a,this.Utils.whitespace))b.length&&(d=!0),this.line_char_count--;else{if(d){if(this.line_char_count>=this.max_char){b.push("\n");for(d=0;d<
this.indent_level;d++)b.push(this.indent_string);this.line_char_count=0}else b.push(" "),this.line_char_count++;d=!1}b.push(a)}}return b.length?b.join(""):""};this.get_contents_to=function(a){if(this.pos==this.input.length)return["","TK_EOF"];var b="",a=RegExp("</"+a+"\\s*>","igm");a.lastIndex=this.pos;a=(a=a.exec(this.input))?a.index:this.input.length;this.pos<a&&(b=this.input.substring(this.pos,a),this.pos=a);return b};this.record_tag=function(a){this.tags[a+"count"]?this.tags[a+"count"]++:this.tags[a+
"count"]=1;this.tags[a+this.tags[a+"count"]]=this.indent_level;this.tags[a+this.tags[a+"count"]+"parent"]=this.tags.parent;this.tags.parent=a+this.tags[a+"count"]};this.retrieve_tag=function(a){if(this.tags[a+"count"]){for(var b=this.tags.parent;b&&!(a+this.tags[a+"count"]===b);)b=this.tags[b+"parent"];b&&(this.indent_level=this.tags[a+this.tags[a+"count"]],this.tags.parent=this.tags[b+"parent"]);delete this.tags[a+this.tags[a+"count"]+"parent"];delete this.tags[a+this.tags[a+"count"]];1==this.tags[a+
"count"]?delete this.tags[a+"count"]:this.tags[a+"count"]--}};this.get_tag=function(){var a="",b=[],d=!1;do{if(this.pos>=this.input.length)return b.length?b.join(""):["","TK_EOF"];a=this.input.charAt(this.pos);this.pos++;this.line_char_count++;if(this.Utils.in_array(a,this.Utils.whitespace))d=!0,this.line_char_count--;else{if("'"===a||'"'===a)if(!b[1]||"!"!==b[1])a+=this.get_unformatted(a),d=!0;"="===a&&(d=!1);b.length&&"="!==b[b.length-1]&&">"!==a&&d&&(this.line_char_count>=this.max_char?(this.print_newline(!1,
b),this.line_char_count=0):(b.push(" "),this.line_char_count++),d=!1);b.push(a)}}while(">"!==a);a=b.join("");d=-1!=a.indexOf(" ")?a.indexOf(" "):a.indexOf(">");d=a.substring(1,d).toLowerCase();"/"===a.charAt(a.length-2)||this.Utils.in_array(d,this.Utils.single_token)?this.tag_type="SINGLE":"script"===d?(this.record_tag(d),this.tag_type="SCRIPT"):"style"===d?(this.record_tag(d),this.tag_type="STYLE"):this.Utils.in_array(d,unformatted)?(a=this.get_unformatted("</"+d+">",a),b.push(a),this.tag_type="SINGLE"):
"!"===d.charAt(0)?-1!=d.indexOf("[if")?(-1!=a.indexOf("!IE")&&(a=this.get_unformatted("--\>",a),b.push(a)),this.tag_type="START"):-1!=d.indexOf("[endif")?(this.tag_type="END",this.unindent()):(a=-1!=d.indexOf("[cdata[")?this.get_unformatted("]]\>",a):this.get_unformatted("--\>",a),b.push(a),this.tag_type="SINGLE"):("/"===d.charAt(0)?(this.retrieve_tag(d.substring(1)),this.tag_type="END"):(this.record_tag(d),this.tag_type="START"),this.Utils.in_array(d,this.Utils.extra_liners)&&this.print_newline(!0,
this.output));return b.join("")};this.get_unformatted=function(a,b){if(b&&-1!=b.indexOf(a))return"";var d="",g="",f=!0;do{if(this.pos>=this.input.length)break;d=this.input.charAt(this.pos);this.pos++;if(this.Utils.in_array(d,this.Utils.whitespace)){if(!f){this.line_char_count--;continue}if("\n"===d||"\r"===d){g+="\n";this.line_char_count=0;continue}}g+=d;this.line_char_count++;f=!0}while(-1==g.indexOf(a));return g};this.get_token=function(){var a;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===
this.last_token){var b=this.last_token.substr(7);a=this.get_contents_to(b);return"string"!==typeof a?a:[a,"TK_"+b]}if("CONTENT"===this.current_mode)return a=this.get_content(),"string"!==typeof a?a:[a,"TK_CONTENT"];if("TAG"===this.current_mode)return a=this.get_tag(),"string"!==typeof a?a:[a,"TK_TAG_"+this.tag_type]};this.get_full_indent=function(a){a=this.indent_level+a||0;return 1>a?"":Array(a+1).join(this.indent_string)};this.printer=function(a,b,d,g,f){this.input=a||"";this.output=[];this.indent_character=
b;this.indent_string="";this.indent_size=d;this.brace_style=f;this.indent_level=0;this.max_char=g;for(a=this.line_char_count=0;a<this.indent_size;a++)this.indent_string+=this.indent_character;this.print_newline=function(a,b){this.line_char_count=0;if(b&&b.length){if(!a)for(;this.Utils.in_array(b[b.length-1],this.Utils.whitespace);)b.pop();b.push("\n");for(var d=0;d<this.indent_level;d++)b.push(this.indent_string)}};this.print_token=function(b){this.output.push(b)};this.indent=function(){this.indent_level++};
this.unindent=function(){0<this.indent_level&&this.indent_level--}};return this};for(b.printer(v,w,t,g,h);;){t=b.get_token();b.token_text=t[0];b.token_type=t[1];if("TK_EOF"===b.token_type)break;switch(b.token_type){case "TK_TAG_START":b.print_newline(!1,b.output);b.print_token(b.token_text);b.indent();b.current_mode="CONTENT";break;case "TK_TAG_STYLE":case "TK_TAG_SCRIPT":b.print_newline(!1,b.output);b.print_token(b.token_text);b.current_mode="CONTENT";break;case "TK_TAG_END":"TK_CONTENT"===b.last_token&&
""===b.last_text&&(t=b.token_text.match(/\w+/)[0],w=b.output[b.output.length-1].match(/<\s*(\w+)/),(null===w||w[1]!==t)&&b.print_newline(!0,b.output));b.print_token(b.token_text);b.current_mode="CONTENT";break;case "TK_TAG_SINGLE":b.print_newline(!1,b.output);b.print_token(b.token_text);b.current_mode="CONTENT";break;case "TK_CONTENT":""!==b.token_text&&b.print_token(b.token_text);b.current_mode="TAG";break;case "TK_STYLE":case "TK_SCRIPT":if(""!==b.token_text){b.output.push("\n");t=b.token_text;
if("TK_SCRIPT"==b.token_type)var m="function"==typeof js_beautify&&js_beautify;else"TK_STYLE"==b.token_type&&(m="function"==typeof css_beautify&&css_beautify);g="keep"==f.indent_scripts?0:"separate"==f.indent_scripts?-b.indent_level:1;w=b.get_full_indent(g);m?t=m(t.replace(/^\s*/,w),f):(h=t.match(/^\s*/)[0].match(/[^\n\r]*$/)[0].split(b.indent_string).length-1,g=b.get_full_indent(g-h),t=t.replace(/^\s*/,w).replace(/\r\n|\r|\n/g,"\n"+g).replace(/\s*$/,""));t&&(b.print_token(t),b.print_newline(!0,b.output))}b.current_mode=
"TAG"}b.last_token=b.token_type;b.last_text=b.token_text}return b.output.join("")}"undefined"!==typeof exports&&(exports.html_beautify=html_beautify);function js_beautify(v,f){function b(b){for(b="undefined"===typeof b?!1:b;l.length&&(" "===l[l.length-1]||l[l.length-1]===D||l[l.length-1]===K||b&&("\n"===l[l.length-1]||"\r"===l[l.length-1]));)l.pop()}function t(b){return b.replace(/^\s\s*|\s\s*$/,"")}function w(){var b=z;z=!1;g();z=b}function g(a){e.eat_next_space=!1;if(!z||!n(e.mode))if(a="undefined"===typeof a?!0:a,e.if_line=!1,b(),l.length){if("\n"!==l[l.length-1]||!a)E=!0,l.push("\n");K&&l.push(K);for(a=0;a<e.indentation_level;a+=1)l.push(D);
e.var_line&&e.var_line_reindented&&l.push(D);e.case_body&&l.push(D)}}function h(){if("TK_COMMENT"===i)return g(!0);if(e.eat_next_space)e.eat_next_space=!1;else{var b=" ";l.length&&(b=l[l.length-1]);" "!==b&&"\n"!==b&&b!==D&&l.push(" ")}}function m(){E=!1;e.eat_next_space=!1;l.push(o)}function a(){e.indentation_level+=1}function C(){l.length&&l[l.length-1]===D&&l.pop()}function d(b){e&&L.push(e);e={previous_mode:e?e.mode:"BLOCK",mode:b,var_line:!1,var_line_tainted:!1,var_line_reindented:!1,in_html_comment:!1,
if_line:!1,in_case:!1,case_body:!1,eat_next_space:!1,indentation_baseline:-1,indentation_level:e?e.indentation_level+(e.case_body?1:0)+(e.var_line&&e.var_line_reindented?1:0):0,ternary_depth:0}}function n(b){return"[EXPRESSION]"===b||"[INDENTED-EXPRESSION]"===b}function x(b){return q(b,["[EXPRESSION]","(EXPRESSION)","(FOR-EXPRESSION)","(COND-EXPRESSION)"])}function G(){M="DO_BLOCK"===e.mode;if(0<L.length){var b=e.mode;e=L.pop();e.previous_mode=b}}function r(b,a){for(var c=0;c<b.length;c++)if(t(b[c])[0]!=
a)return!1;return!0}function q(b,a){for(var c=0;c<a.length;c+=1)if(a[c]===b)return!0;return!1}function P(b){for(var a=c,e=k.charAt(a);q(e,N)&&e!=b;){a++;if(a>=u)return 0;e=k.charAt(a)}return e}function Q(){A=0;if(c>=u)return["","TK_EOF"];H=!1;var a=k.charAt(c);c+=1;if(z&&n(e.mode)){for(var d=0;q(a,N);){"\n"===a?(b(),l.push("\n"),E=!0,d=0):"\t"===a?d+=4:"\r"!==a&&(d+=1);if(c>=u)return["","TK_EOF"];a=k.charAt(c);c+=1}-1===e.indentation_baseline&&(e.indentation_baseline=d);if(E){var f;for(f=0;f<e.indentation_level+
1;f+=1)l.push(D);if(-1!==e.indentation_baseline)for(f=0;f<d-e.indentation_baseline;f++)l.push(" ")}}else{for(;q(a,N);){"\n"===a&&(A+=T?A<=T?1:0:1);if(c>=u)return["","TK_EOF"];a=k.charAt(c);c+=1}if(R&&1<A)for(f=0;f<A;f+=1)g(0===f),E=!0;H=0<A}if(q(a,O)){if(c<u)for(;q(k.charAt(c),O)&&!(a+=k.charAt(c),c+=1,c===u););if(c!==u&&a.match(/^[0-9]+[Ee]$/)&&("-"===k.charAt(c)||"+"===k.charAt(c)))return d=k.charAt(c),c+=1,f=Q(c),a+=d+f[0],[a,"TK_WORD"];if("in"===a)return[a,"TK_OPERATOR"];H&&"TK_OPERATOR"!==i&&
"TK_EQUALS"!==i&&!e.if_line&&(R||"var"!==j)&&g();return[a,"TK_WORD"]}if("("===a||"["===a)return[a,"TK_START_EXPR"];if(")"===a||"]"===a)return[a,"TK_END_EXPR"];if("{"===a)return[a,"TK_START_BLOCK"];if("}"===a)return[a,"TK_END_BLOCK"];if(";"===a)return[a,"TK_SEMICOLON"];if("/"===a){d="";f=!0;if("*"===k.charAt(c)){c+=1;if(c<u)for(;!("*"===k.charAt(c)&&k.charAt(c+1)&&"/"===k.charAt(c+1))&&c<u;){a=k.charAt(c);d+=a;if("\r"===a||"\n"===a)f=!1;c+=1;if(c>=u)break}c+=2;return f&&0==A?["/*"+d+"*/","TK_INLINE_COMMENT"]:
["/*"+d+"*/","TK_BLOCK_COMMENT"]}if("/"===k.charAt(c)){for(d=a;"\r"!==k.charAt(c)&&"\n"!==k.charAt(c)&&!(d+=k.charAt(c),c+=1,c>=u););c+=1;H&&g();return[d,"TK_COMMENT"]}}if("'"===a||'"'===a||"/"===a&&("TK_WORD"===i&&q(j,["return","do","else"])||")"===j&&q(e.previous_mode,["(COND-EXPRESSION)","(FOR-EXPRESSION)"])||"TK_COMMENT"===i||"TK_START_EXPR"===i||"TK_START_BLOCK"===i||"TK_END_BLOCK"===i||"TK_OPERATOR"===i||"TK_EQUALS"===i||"TK_EOF"===i||"TK_SEMICOLON"===i)){d=a;f=!1;var h=a;if(c<u)if("/"===d)for(a=
!1;f||a||k.charAt(c)!==d;){if(h+=k.charAt(c),f?f=!1:(f="\\"===k.charAt(c),"["===k.charAt(c)?a=!0:"]"===k.charAt(c)&&(a=!1)),c+=1,c>=u)return[h,"TK_STRING"]}else for(;f||k.charAt(c)!==d;)if(h+=k.charAt(c),f=f?!1:"\\"===k.charAt(c),c+=1,c>=u)return[h,"TK_STRING"];c+=1;h+=d;if("/"===d)for(;c<u&&q(k.charAt(c),O);)h+=k.charAt(c),c+=1;return[h,"TK_STRING"]}if("#"===a){if(0===l.length&&"!"===k.charAt(c)){for(h=a;c<u&&"\n"!=a;)a=k.charAt(c),h+=a,c+=1;l.push(t(h)+"\n");g();return Q()}d="#";if(c<u&&q(k.charAt(c),
U)){do a=k.charAt(c),d+=a,c+=1;while(c<u&&"#"!==a&&"="!==a);"#"!==a&&("["===k.charAt(c)&&"]"===k.charAt(c+1)?(d+="[]",c+=2):"{"===k.charAt(c)&&"}"===k.charAt(c+1)&&(d+="{}",c+=2));return[d,"TK_WORD"]}}if("<"===a&&"<\!--"===k.substring(c-1,c+3)){c+=3;for(a="<\!--";"\n"!=k[c]&&c<u;)a+=k[c],c++;e.in_html_comment=!0;return[a,"TK_COMMENT"]}if("-"===a&&e.in_html_comment&&"--\>"===k.substring(c-1,c+2))return e.in_html_comment=!1,c+=2,H&&g(),["--\>","TK_COMMENT"];if(q(a,I)){for(;c<u&&q(a+k.charAt(c),I)&&
!(a+=k.charAt(c),c+=1,c>=u););return"="===a?[a,"TK_EQUALS"]:[a,"TK_OPERATOR"]}return[a,"TK_UNKNOWN"]}var k,l,o,i,j,s,B,e,L,D,N,O,I,c,F,U,p,J,M,H,E,A,K="",f=f?f:{},y;void 0!==f.space_after_anon_function&&void 0===f.jslint_happy&&(f.jslint_happy=f.space_after_anon_function);void 0!==f.braces_on_own_line&&(y=f.braces_on_own_line?"expand":"collapse");y=f.brace_style?f.brace_style:y?y:"collapse";B=f.indent_size?f.indent_size:4;F=f.indent_char?f.indent_char:" ";var R="undefined"===typeof f.preserve_newlines?
!0:f.preserve_newlines,T="undefined"===typeof f.max_preserve_newlines?!1:f.max_preserve_newlines,z="undefined"===typeof f.keep_array_indentation?!1:f.keep_array_indentation,V="undefined"===typeof f.space_before_conditional?!0:f.space_before_conditional,S="undefined"===typeof f.indent_case?!1:f.indent_case;E=!1;var u=v.length;for(D="";0<B;)D+=F,B-=1;for(;v&&(" "===v[0]||"\t"===v[0]);)K+=v[0],v=v.substring(1);k=v;B="";i="TK_START_EXPR";s=j="";l=[];M=!1;N=["\n","\r","\t"," "];O="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,0,1,2,3,4,5,6,7,8,9,_,$".split(",");
U="0,1,2,3,4,5,6,7,8,9".split(",");I="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::";I+=" <%= <% %> <?= <? ?>";I=I.split(" ");F="continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(",");L=[];d("BLOCK");for(c=0;;){J=Q(c);o=J[0];J=J[1];if("TK_EOF"===J)break;switch(J){case "TK_START_EXPR":if("["===o){if("TK_WORD"===i||")"===j){q(j,F)&&h();d("(EXPRESSION)");m();break}"[EXPRESSION]"===e.mode||"[INDENTED-EXPRESSION]"===
e.mode?"]"===s&&","===j?("[EXPRESSION]"===e.mode&&(e.mode="[INDENTED-EXPRESSION]",z||a()),d("[EXPRESSION]"),z||g()):"["===j?("[EXPRESSION]"===e.mode&&(e.mode="[INDENTED-EXPRESSION]",z||a()),d("[EXPRESSION]"),z||g()):d("[EXPRESSION]"):d("[EXPRESSION]")}else"for"===B?d("(FOR-EXPRESSION)"):q(B,["if","while"])?d("(COND-EXPRESSION)"):d("(EXPRESSION)");";"===j||"TK_START_BLOCK"===i?g():"TK_END_EXPR"===i||"TK_START_EXPR"===i||"TK_END_BLOCK"===i||"."===j?H&&g():"TK_WORD"!==i&&"TK_OPERATOR"!==i?h():"function"===
B||"typeof"===B?h():(q(j,F)||"catch"===j)&&V&&h();m();break;case "TK_END_EXPR":if("]"===o)if(z){if("}"===j){C();m();G();break}}else if("[INDENTED-EXPRESSION]"===e.mode&&"]"===j){G();g();m();break}G();m();break;case "TK_START_BLOCK":"do"===B?d("DO_BLOCK"):d("BLOCK");"expand"==y||"expand-strict"==y?(s=!1,"expand-strict"==y?(s="}"==P())||g(!0):"TK_OPERATOR"!==i&&("return"===j||"="===j||"throw"===j?h():g(!0)),m(),s||a()):("TK_OPERATOR"!==i&&"TK_START_EXPR"!==i?"TK_START_BLOCK"===i?g():h():n(e.previous_mode)&&
","===j&&("}"===s?h():g()),a(),m());break;case "TK_END_BLOCK":G();"expand"==y||"expand-strict"==y?"{"!==j&&g():"TK_START_BLOCK"===i?E?C():b():n(e.mode)&&z?(z=!1,g(),z=!0):g();m();break;case "TK_WORD":if(M){h();m();h();M=!1;break}if("function"===o&&(e.var_line&&(e.var_line_reindented=!0),(E||";"===j)&&"{"!==j&&"TK_BLOCK_COMMENT"!=i&&"TK_COMMENT"!=i)){A=E?A:0;R||(A=1);for(p=0;p<2-A;p++)g(!1)}if("case"===o||"default"===o){":"===j||e.case_body?C():(S||e.indentation_level--,g(),S||e.indentation_level++);
m();e.in_case=!0;e.case_body=!1;break}p="NONE";"TK_END_BLOCK"===i?q(o.toLowerCase(),["else","catch","finally"])?"expand"==y||"end-expand"==y||"expand-strict"==y?p="NEWLINE":(p="SPACE",h()):p="NEWLINE":"TK_SEMICOLON"===i&&("BLOCK"===e.mode||"DO_BLOCK"===e.mode)?p="NEWLINE":"TK_SEMICOLON"===i&&x(e.mode)?p="SPACE":"TK_STRING"===i?p="NEWLINE":"TK_WORD"===i?("else"===j&&b(!0),p="SPACE"):"TK_START_BLOCK"===i?p="NEWLINE":"TK_END_EXPR"===i&&(h(),p="NEWLINE");if(q(o,F)&&")"!==j&&(p="else"==j?"SPACE":"NEWLINE",
"function"===o&&("get"===j||"set"===j)))p="SPACE";e.if_line&&"TK_END_EXPR"===i&&(e.if_line=!1);if(q(o.toLowerCase(),["else","catch","finally"]))"TK_END_BLOCK"!==i||"expand"==y||"end-expand"==y||"expand-strict"==y?g():(b(!0),h());else if("NEWLINE"===p){if(!(("TK_START_EXPR"===i||"="===j||","===j)&&"function"===o))if("function"===o&&"new"==j)h();else if("return"===j||"throw"===j)h();else if("TK_END_EXPR"!==i){if(("TK_START_EXPR"!==i||"var"!==o)&&":"!==j)"if"===o&&"else"===B&&"{"!==j?h():(e.var_line=
!1,e.var_line_reindented=!1,g())}else q(o,F)&&")"!=j&&(e.var_line=!1,e.var_line_reindented=!1,g())}else n(e.mode)&&","===j&&"}"===s?g():"SPACE"===p&&h();m();B=o;"var"===o&&(e.var_line=!0,e.var_line_reindented=!1,e.var_line_tainted=!1);"if"===o&&(e.if_line=!0);"else"===o&&(e.if_line=!1);break;case "TK_SEMICOLON":m();e.var_line=!1;e.var_line_reindented=!1;"OBJECT"==e.mode&&(e.mode="BLOCK");break;case "TK_STRING":"TK_END_EXPR"===i&&q(e.previous_mode,["(COND-EXPRESSION)","(FOR-EXPRESSION)"])?h():"TK_STRING"==
i||"TK_START_BLOCK"===i||"TK_END_BLOCK"===i||"TK_SEMICOLON"===i?g():"TK_WORD"===i&&h();m();break;case "TK_EQUALS":e.var_line&&(e.var_line_tainted=!0);h();m();h();break;case "TK_OPERATOR":p=s=!0;e.var_line&&","===o&&x(e.mode)&&(e.var_line_tainted=!1);if(e.var_line&&","===o)if(e.var_line_tainted){m();e.var_line_reindented=!0;e.var_line_tainted=!1;g();break}else e.var_line_tainted=!1;if("return"===j||"throw"===j){h();m();break}if(":"===o&&e.in_case){S&&(e.case_body=!0);m();g();e.in_case=!1;break}if("::"===
o){m();break}if(","===o){e.var_line?e.var_line_tainted?(m(),g(),e.var_line_tainted=!1):(m(),h()):"TK_END_BLOCK"===i&&"(EXPRESSION)"!==e.mode?(m(),"OBJECT"===e.mode&&"}"===j?g():h()):"OBJECT"===e.mode?(m(),g()):(m(),h());break}else q(o,["--","++","!"])||q(o,["-","+"])&&(q(i,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||q(j,F))?(p=s=!1,";"===j&&x(e.mode)&&(s=!0),"TK_WORD"===i&&q(j,F)&&(s=!0),"BLOCK"===e.mode&&("{"===j||";"===j)&&g()):"."===o?s=!1:":"===o?0==e.ternary_depth?(e.mode=
"OBJECT",s=!1):e.ternary_depth-=1:"?"===o&&(e.ternary_depth+=1);s&&h();m();p&&h();break;case "TK_BLOCK_COMMENT":s=o.split(/\x0a|\x0d\x0a/);if(r(s.slice(1),"*")){g();l.push(s[0]);for(p=1;p<s.length;p++)g(),l.push(" "),l.push(t(s[p]))}else{1<s.length?g():"TK_END_BLOCK"===i?g():h();for(p=0;p<s.length;p++)l.push(s[p]),l.push("\n")}"\n"!=P("\n")&&g();break;case "TK_INLINE_COMMENT":h();m();x(e.mode)?h():w();break;case "TK_COMMENT":H?g():h();m();"\n"!=P("\n")&&w();break;case "TK_UNKNOWN":("return"===j||
"throw"===j)&&h(),m()}s=j;i=J;j=o}return K+l.join("").replace(/[\n ]+$/,"")}"undefined"!==typeof exports&&(exports.js_beautify=js_beautify);