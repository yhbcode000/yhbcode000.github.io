"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  var blogNameWidth = document.getElementById('site-name').offsetWidth;
  var $menusEle = document.querySelector('#menus .menus_items');
  var menusWidth = $menusEle && $menusEle.offsetWidth;
  var $searchEle = document.querySelector('#search-button');
  var searchWidth = $searchEle && $searchEle.offsetWidth;
  var detectFontSizeChange = false;

  var adjustMenu = function adjustMenu() {
    if (detectFontSizeChange) {
      blogNameWidth = document.getElementById('site-name').offsetWidth;
      menusWidth = $menusEle && $menusEle.offsetWidth;
      searchWidth = $searchEle && $searchEle.offsetWidth;
      detectFontSizeChange = false;
    }

    var $nav = document.getElementById('nav');
    var t;
    if (window.innerWidth < 768) t = true;else t = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120;

    if (t) {
      $nav.classList.add('hide-menu');
    } else {
      $nav.classList.remove('hide-menu');
    }
  }; // 初始化header


  var initAdjust = function initAdjust() {
    adjustMenu();
    document.getElementById('nav').classList.add('show');
  }; // sidebar menus


  var sidebarFn = function sidebarFn() {
    var $toggleMenu = document.getElementById('toggle-menu');
    var $mobileSidebarMenus = document.getElementById('sidebar-menus');
    var $menuMask = document.getElementById('menu-mask');
    var $body = document.body;

    function openMobileSidebar() {
      btf.sidebarPaddingR();
      $body.style.overflow = 'hidden';
      btf.fadeIn($menuMask, 0.5);
      $mobileSidebarMenus.classList.add('open');
    }

    function closeMobileSidebar() {
      $body.style.overflow = '';
      $body.style.paddingRight = '';
      btf.fadeOut($menuMask, 0.5);
      $mobileSidebarMenus.classList.remove('open');
    }

    $toggleMenu.addEventListener('click', openMobileSidebar);
    $menuMask.addEventListener('click', function (e) {
      if ($mobileSidebarMenus.classList.contains('open')) {
        closeMobileSidebar();
      }
    });
    window.addEventListener('resize', function (e) {
      if (btf.isHidden($toggleMenu)) {
        if ($mobileSidebarMenus.classList.contains('open')) closeMobileSidebar();
      }
    });
  };
  /**
  * 首頁top_img底下的箭頭
  */


  var scrollDownInIndex = function scrollDownInIndex() {
    var $scrollDownEle = document.getElementById('scroll-down');
    $scrollDownEle && $scrollDownEle.addEventListener('click', function () {
      btf.scrollToDest(document.getElementById('content-inner').offsetTop, 300);
    });
  };
  /**
  * 代碼
  * 只適用於Hexo默認的代碼渲染
  */


  var addHighlightTool = function addHighlightTool() {
    var isHighlightCopy = GLOBAL_CONFIG.highlight.highlightCopy;
    var isHighlightLang = GLOBAL_CONFIG.highlight.highlightLang;
    var isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    var isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
    var $figureHighlight = GLOBAL_CONFIG.highlight.plugin === 'highlighjs' ? document.querySelectorAll('figure.highlight') : document.querySelectorAll('pre[class*="language-"]');

    if (isShowTool && $figureHighlight.length) {
      var isPrismjs = GLOBAL_CONFIG.highlight.plugin === 'prismjs';
      var highlightShrinkEle = '';
      var highlightCopyEle = '';
      var highlightShrinkClass = isHighlightShrink === true ? 'closed' : '';

      if (isHighlightShrink !== undefined) {
        highlightShrinkEle = "<i class=\"fas fa-angle-down expand ".concat(highlightShrinkClass, "\"></i>");
      }

      if (isHighlightCopy) {
        highlightCopyEle = '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>';
      }

      var copy = function copy(text, ctx) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
          document.execCommand('copy');

          if (GLOBAL_CONFIG.Snackbar !== undefined) {
            btf.snackbarShow(GLOBAL_CONFIG.copy.success);
          } else {
            var prevEle = ctx.previousElementSibling;
            prevEle.innerText = GLOBAL_CONFIG.copy.success;
            prevEle.style.opacity = 1;
            setTimeout(function () {
              prevEle.style.opacity = 0;
            }, 700);
          }
        } else {
          if (GLOBAL_CONFIG.Snackbar !== undefined) {
            btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport);
          } else {
            ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
          }
        }
      }; // click events


      var highlightCopyFn = function highlightCopyFn(ele) {
        var $buttonParent = ele.parentNode;
        $buttonParent.classList.add('copy-true');
        var selection = window.getSelection();
        var range = document.createRange();
        if (isPrismjs) range.selectNodeContents($buttonParent.querySelectorAll('pre code')[0]);else range.selectNodeContents($buttonParent.querySelectorAll('table .code pre')[0]);
        selection.removeAllRanges();
        selection.addRange(range);
        var text = selection.toString();
        copy(text, ele.lastChild);
        selection.removeAllRanges();
        $buttonParent.classList.remove('copy-true');
      };

      var highlightShrinkFn = function highlightShrinkFn(ele) {
        var $nextEle = _toConsumableArray(ele.parentNode.children).slice(1);

        ele.firstChild.classList.toggle('closed');

        if (btf.isHidden($nextEle[0])) {
          $nextEle.forEach(function (e) {
            e.style.display = 'block';
          });
        } else {
          $nextEle.forEach(function (e) {
            e.style.display = 'none';
          });
        }
      };

      var highlightToolsFn = function highlightToolsFn(e) {
        var $target = e.target.classList;
        if ($target.contains('expand')) highlightShrinkFn(this);else if ($target.contains('copy-button')) highlightCopyFn(this);
      };

      var createEle = function createEle() {
        var newEle = document.createElement('div');
        newEle.className = "highlight-tools ".concat(highlightShrinkClass);
        newEle.addEventListener('click', highlightToolsFn);
        return newEle;
      };

      if (isHighlightLang) {
        if (isPrismjs) {
          $figureHighlight.forEach(function (item) {
            var langName = item.getAttribute('data-language') !== undefined ? item.getAttribute('data-language') : 'Code';
            var highlightLangEle = "<div class=\"code-lang\">".concat(langName, "</div>");
            btf.wrap(item, 'figure', '', 'highlight');
            var newEle = createEle();
            newEle.innerHTML = highlightShrinkEle + highlightLangEle + highlightCopyEle;
            item.parentNode.insertBefore(newEle, item);
          });
        } else {
          $figureHighlight.forEach(function (item) {
            var langName = item.getAttribute('class').split(' ')[1];
            if (langName === 'plain' || langName === undefined) langName = 'Code';
            var highlightLangEle = "<div class=\"code-lang\">".concat(langName, "</div>");
            var newEle = createEle();
            newEle.innerHTML = highlightShrinkEle + highlightLangEle + highlightCopyEle;
            item.insertBefore(newEle, item.firstChild);
          });
        }
      } else {
        if (isPrismjs) {
          $figureHighlight.forEach(function (item) {
            btf.wrap(item, 'figure', '', 'highlight');
            var newEle = createEle();
            newEle.innerHTML = highlightShrinkEle + highlightCopyEle;
            item.parentNode.insertBefore(newEle, item);
          });
        } else {
          $figureHighlight.forEach(function (item) {
            var newEle = createEle();
            newEle.innerHTML = highlightShrinkEle + highlightCopyEle;
            item.insertBefore(newEle, item.firstChild);
          });
        }
      }
    }
  };
  /**
  * PhotoFigcaption
  */


  function addPhotoFigcaption() {
    document.querySelectorAll('#article-container img').forEach(function (item) {
      var parentEle = item.parentNode;

      if (!parentEle.parentNode.classList.contains('justified-gallery')) {
        var ele = document.createElement('div');
        ele.className = 'img-alt is-center';
        ele.textContent = item.getAttribute('alt');
        parentEle.insertBefore(ele, item.nextSibling);
      }
    });
  }
  /**
  * justified-gallery 圖庫排版
  * 需要 jQuery
  */


  var detectJgJsLoad = false;

  var runJustifiedGallery = function runJustifiedGallery(ele) {
    var $justifiedGallery = $(ele);
    var $imgList = $justifiedGallery.find('img');
    $imgList.unwrap();

    if ($imgList.length) {
      $imgList.each(function (i, o) {
        if ($(o).attr('data-lazy-src')) $(o).attr('src', $(o).attr('data-lazy-src'));
        $(o).wrap('<div></div>');
      });
    }

    if (detectJgJsLoad) btf.initJustifiedGallery($justifiedGallery);else {
      $('head').append("<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(GLOBAL_CONFIG.source.justifiedGallery.css, "\">"));
      $.getScript("".concat(GLOBAL_CONFIG.source.justifiedGallery.js), function () {
        btf.initJustifiedGallery($justifiedGallery);
      });
      detectJgJsLoad = true;
    }
  };
  /**
  * fancybox和 mediumZoom
  */


  var addFancybox = function addFancybox(ele) {
    if (ele.length) {
      var runFancybox = function runFancybox(ele) {
        ele.each(function (i, o) {
          var $this = $(o);
          var lazyloadSrc = $this.attr('data-lazy-src') || $this.attr('src');
          var dataCaption = $this.attr('alt') || '';
          $this.wrap("<a href=\"".concat(lazyloadSrc, "\" data-fancybox=\"group\" data-caption=\"").concat(dataCaption, "\" class=\"fancybox\"></a>"));
        });
        $().fancybox({
          selector: '[data-fancybox]',
          loop: true,
          transitionEffect: 'slide',
          protect: true,
          buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
          hash: false
        });
      };

      if (typeof $.fancybox === 'undefined') {
        $('head').append("<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(GLOBAL_CONFIG.source.fancybox.css, "\">"));
        $.getScript("".concat(GLOBAL_CONFIG.source.fancybox.js), function () {
          runFancybox($(ele));
        });
      } else {
        runFancybox($(ele));
      }
    }
  };

  var addMediumZoom = function addMediumZoom() {
    var zoom = mediumZoom(document.querySelectorAll('#article-container :not(a)>img'));
    zoom.on('open', function (e) {
      var photoBg = $(document.documentElement).attr('data-theme') === 'dark' ? '#121212' : '#fff';
      zoom.update({
        background: photoBg
      });
    });
  };

  var jqLoadAndRun = function jqLoadAndRun() {
    var isFancybox = GLOBAL_CONFIG.lightbox === 'fancybox';
    var $fancyboxEle = isFancybox ? document.querySelectorAll('#article-container :not(a):not(.gallery-group) > img, #article-container > img') : null;
    var $jgEle = document.querySelectorAll('#article-container .justified-gallery');
    var jgEleLength = $jgEle.length;

    if (jgEleLength || $fancyboxEle !== null) {
      btf.isJqueryLoad(function () {
        jgEleLength && runJustifiedGallery($jgEle);
        isFancybox && addFancybox($fancyboxEle);
      });
    }
  };
  /**
  * 滾動處理
  */


  var scrollFn = function scrollFn() {
    var $rightside = document.getElementById('rightside');
    var innerHeight = window.innerHeight + 56; // 當滾動條小于 56 的時候

    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = 'opacity: 1; transform: translateX(-38px)';
      return;
    }

    var initTop = 0;
    var isChatShow = true;
    var $nav = document.getElementById('nav');
    var isChatBtnHide = typeof chatBtnHide === 'function';
    var isChatBtnShow = typeof chatBtnShow === 'function';
    window.addEventListener('scroll', btf.throttle(function (e) {
      var currentTop = window.scrollY || document.documentElement.scrollTop;
      var isDown = scrollDirection(currentTop);

      if (currentTop > 56) {
        if (isDown) {
          if ($nav.classList.contains('visible')) $nav.classList.remove('visible');

          if (isChatBtnShow && isChatShow === true) {
            chatBtnHide();
            isChatShow = false;
          }
        } else {
          if (!$nav.classList.contains('visible')) $nav.classList.add('visible');

          if (isChatBtnHide && isChatShow === false) {
            chatBtnShow();
            isChatShow = true;
          }
        }

        $nav.classList.add('fixed');

        if (window.getComputedStyle($rightside).getPropertyValue('opacity') === '0') {
          $rightside.style.cssText = 'opacity: 1; transform: translateX(-38px)';
        }
      } else {
        if (currentTop === 0) {
          $nav.classList.remove('fixed', 'visible');
        }

        $rightside.style.cssText = "opacity: ''; transform: ''";
      }

      if (document.body.scrollHeight <= innerHeight) {
        $rightside.style.cssText = 'opacity: 1; transform: translateX(-38px)';
      }

      if (isDown && currentTop < document.getElementById('content-inner').offsetTop) {
        btf.scrollToDest(document.getElementById('content-inner').offsetTop, 0);
      }
    }, 200)); // find the scroll direction

    function scrollDirection(currentTop) {
      var result = currentTop > initTop; // true is down & false is up

      initTop = currentTop;
      return result;
    }
  };
  /**
  *  toc
  */


  var tocFn = function tocFn() {
    var $cardTocLayout = document.getElementById('card-toc');
    var $cardToc = $cardTocLayout.getElementsByClassName('toc-content')[0];
    var $tocLink = $cardToc.querySelectorAll('.toc-link');
    var $article = document.getElementById('article-container'); // main of scroll

    window.addEventListener('scroll', btf.throttle(function (e) {
      var currentTop = window.scrollY || document.documentElement.scrollTop;
      scrollPercent(currentTop);
      findHeadPosition(currentTop);
    }, 100));

    var scrollPercent = function scrollPercent(currentTop) {
      var docHeight = $article.clientHeight;
      var winHeight = document.documentElement.clientHeight;
      var headerHeight = $article.offsetTop;
      var contentMath = docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
      var scrollPercent = (currentTop - headerHeight) / contentMath;
      var scrollPercentRounded = Math.round(scrollPercent * 100);
      var percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded;
      $cardToc.setAttribute('progress-percentage', percentage);
    }; // anchor


    var isAnchor = GLOBAL_CONFIG.isanchor;

    var updateAnchor = function updateAnchor(anchor) {
      if (window.history.replaceState && anchor !== window.location.hash) {
        if (!anchor) anchor = location.pathname;
        window.history.replaceState({}, '', anchor);
      }
    };

    var mobileToc = {
      open: function open() {
        $cardTocLayout.style.cssText = 'animation: toc-open .3s; opacity: 1; right: 45px';
      },
      close: function close() {
        $cardTocLayout.style.animation = 'toc-close .2s';
        setTimeout(function () {
          $cardTocLayout.style.cssText = "opacity:''; animation: ''; right: ''";
        }, 100);
      }
    };
    document.getElementById('mobile-toc-button').addEventListener('click', function () {
      if (window.getComputedStyle($cardTocLayout).getPropertyValue('opacity') === '0') mobileToc.open();else mobileToc.close();
    }); // toc元素點擊

    $cardToc.addEventListener('click', function (e) {
      e.preventDefault();
      var $target = e.target.classList.contains('toc-link') ? e.target : e.target.parentElement;
      btf.scrollToDest(btf.getEleTop(document.getElementById(decodeURI($target.getAttribute('href')).replace('#', ''))), 300);

      if (window.innerWidth < 900) {
        mobileToc.close();
      }
    });

    var autoScrollToc = function autoScrollToc(item) {
      var activePosition = item.getBoundingClientRect().top;
      var sidebarScrollTop = $cardToc.scrollTop;

      if (activePosition > document.documentElement.clientHeight - 100) {
        $cardToc.scrollTop = sidebarScrollTop + 150;
      }

      if (activePosition < 100) {
        $cardToc.scrollTop = sidebarScrollTop - 150;
      }
    }; // find head position & add active class


    var list = $article.querySelectorAll('h1,h2,h3,h4,h5,h6');
    var detectItem = '';

    var findHeadPosition = function findHeadPosition(top) {
      if ($tocLink.length === 0 || top === 0) {
        return false;
      }

      var currentId = '';
      var currentIndex = '';
      list.forEach(function (ele, index) {
        if (top > btf.getEleTop(ele) - 70) {
          currentId = '#' + encodeURI(ele.getAttribute('id'));
          currentIndex = index;
        }
      });
      if (detectItem === currentIndex) return;
      if (isAnchor) updateAnchor(currentId);

      if (currentId === '') {
        $cardToc.querySelectorAll('.active').forEach(function (i) {
          i.classList.remove('active');
        });
        detectItem = currentIndex;
        return;
      }

      detectItem = currentIndex;
      $cardToc.querySelectorAll('.active').forEach(function (item) {
        item.classList.remove('active');
      });
      var currentActive = $tocLink[currentIndex];
      currentActive.classList.add('active');
      setTimeout(function () {
        autoScrollToc(currentActive);
      }, 0);
      var parent = currentActive.parentNode;

      for (; !parent.matches('.toc'); parent = parent.parentNode) {
        if (parent.matches('li')) parent.classList.add('active');
      }
    };
  };
  /**
  * Rightside
  */


  var rightSideFn = {
    switchReadMode: function switchReadMode() {
      // read-mode
      document.body.classList.toggle('read-mode');
    },
    switchDarkMode: function switchDarkMode() {
      // Switch Between Light And Dark Mode
      var nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

      if (nowMode === 'light') {
        activateDarkMode();
        saveToLocal.set('theme', 'dark', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      } else {
        activateLightMode();
        saveToLocal.set('theme', 'light', 2);
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      } // handle some cases


      typeof utterancesTheme === 'function' && utterancesTheme();
      (typeof FB === "undefined" ? "undefined" : _typeof(FB)) === 'object' && window.loadFBComment();
      window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(function () {
        return window.disqusReset();
      }, 200);
    },
    showOrHideBtn: function showOrHideBtn() {
      // rightside 點擊設置 按鈕 展開
      document.getElementById('rightside-config-hide').classList.toggle('show');
    },
    scrollToTop: function scrollToTop() {
      // Back to top
      btf.scrollToDest(0, 500);
    },
    hideAsideBtn: function hideAsideBtn() {
      // Hide aside
      var $htmlDom = document.documentElement.classList;
      $htmlDom.contains('hide-aside') ? saveToLocal.set('aside-status', 'show', 2) : saveToLocal.set('aside-status', 'hide', 2);
      $htmlDom.toggle('hide-aside');
    },
    adjustFontSize: function adjustFontSize(plus) {
      var fontSizeVal = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--global-font-size'));
      var newValue = '';
      detectFontSizeChange = true;

      if (plus) {
        if (fontSizeVal >= 20) return;
        newValue = fontSizeVal + 1;
        document.documentElement.style.setProperty('--global-font-size', newValue + 'px');
        !document.getElementById('nav').classList.contains('hide-menu') && adjustMenu();
      } else {
        if (fontSizeVal <= 10) return;
        newValue = fontSizeVal - 1;
        document.documentElement.style.setProperty('--global-font-size', newValue + 'px');
        document.getElementById('nav').classList.contains('hide-menu') && adjustMenu();
      }

      saveToLocal.set('global-font-size', newValue, 2); // document.getElementById('font-text').innerText = newValue
    }
  };
  document.getElementById('rightside').addEventListener('click', function (e) {
    var $target = e.target.id || e.target.parentNode.id;

    switch ($target) {
      case 'go-up':
        rightSideFn.scrollToTop();
        break;

      case 'rightside_config':
        rightSideFn.showOrHideBtn();
        break;

      case 'readmode':
        rightSideFn.switchReadMode();
        break;

      case 'darkmode':
        rightSideFn.switchDarkMode();
        break;

      case 'hide-aside-btn':
        rightSideFn.hideAsideBtn();
        break;

      case 'font-plus':
        rightSideFn.adjustFontSize(true);
        break;

      case 'font-minus':
        rightSideFn.adjustFontSize();
        break;

      default:
        break;
    }
  });
  /**
  * menu
  * 側邊欄sub-menu 展開/收縮
  * 解決menus在觸摸屏下，滑動屏幕menus_item_child不消失的問題（手機hover的bug)
  */

  var clickFnOfSubMenu = function clickFnOfSubMenu() {
    document.querySelectorAll('#sidebar-menus .expand').forEach(function (e) {
      e.addEventListener('click', function () {
        this.classList.toggle('hide');
        var $dom = this.parentNode.nextElementSibling;

        if (btf.isHidden($dom)) {
          $dom.style.display = 'block';
        } else {
          $dom.style.display = 'none';
        }
      });
    });
    window.addEventListener('touchmove', function (e) {
      var $menusChild = document.querySelectorAll('#nav .menus_item_child');
      $menusChild.forEach(function (item) {
        if (!btf.isHidden(item)) item.style.display = 'none';
      });
    });
  };
  /**
  * 複製時加上版權信息
  */


  var addCopyright = function addCopyright() {
    var copyright = GLOBAL_CONFIG.copyright;

    document.body.oncopy = function (e) {
      e.preventDefault();
      var textFont;
      var copyFont = window.getSelection(0).toString();

      if (copyFont.length > copyright.limitCount) {
        textFont = copyFont + '\n' + '\n' + '\n' + copyright.languages.author + '\n' + copyright.languages.link + window.location.href + '\n' + copyright.languages.source + '\n' + copyright.languages.info;
      } else {
        textFont = copyFont;
      }

      if (e.clipboardData) {
        return e.clipboardData.setData('text', textFont);
      } else {
        return window.clipboardData.setData('text', textFont);
      }
    };
  };
  /**
  * 網頁運行時間
  */


  var addRuntime = function addRuntime() {
    var $runtimeCount = document.getElementById('runtimeshow');

    if ($runtimeCount) {
      var publishDate = $runtimeCount.getAttribute('data-publishDate');
      $runtimeCount.innerText = btf.diffDate(publishDate) + ' ' + GLOBAL_CONFIG.runtime;
    }
  };
  /**
  * 最後一次更新時間
  */


  var addLastPushDate = function addLastPushDate() {
    var $lastPushDateItem = document.getElementById('last-push-date');

    if ($lastPushDateItem) {
      var lastPushDate = $lastPushDateItem.getAttribute('data-lastPushDate');
      $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true);
    }
  };
  /**
  * table overflow
  */


  var addTableWrap = function addTableWrap() {
    var $table = document.querySelectorAll('#article-container :not(.highlight) > table, #article-container > table');

    if ($table.length) {
      $table.forEach(function (item) {
        btf.wrap(item, 'div', '', 'table-wrap');
      });
    }
  };
  /**
  * tag-hide
  */


  var clickFnOfTagHide = function clickFnOfTagHide() {
    var $hideInline = document.querySelectorAll('#article-container .hide-button');

    if ($hideInline.length) {
      $hideInline.forEach(function (item) {
        item.addEventListener('click', function (e) {
          var $this = this;
          var $hideContent = $this.nextElementSibling;
          $this.classList.toggle('open');

          if ($this.classList.contains('open')) {
            if ($hideContent.querySelectorAll('.justified-gallery').length > 0) {
              btf.initJustifiedGallery($hideContent.querySelectorAll('.justified-gallery'));
            }
          }
        });
      });
    }
  };

  var tabsFn = {
    clickFnOfTabs: function clickFnOfTabs() {
      document.querySelectorAll('#article-container .tab > button').forEach(function (item) {
        item.addEventListener('click', function (e) {
          var $this = this;
          var $tabItem = $this.parentNode;

          if (!$tabItem.classList.contains('active')) {
            var $tabContent = $tabItem.parentNode.nextElementSibling;
            var $siblings = btf.siblings($tabItem, '.active')[0];
            $siblings && $siblings.classList.remove('active');
            $tabItem.classList.add('active');
            var tabId = $this.getAttribute('data-href').replace('#', '');

            var childList = _toConsumableArray($tabContent.children);

            childList.forEach(function (item) {
              if (item.id === tabId) item.classList.add('active');else item.classList.remove('active');
            });
            var $isTabJustifiedGallery = $tabContent.querySelectorAll("#".concat(tabId, " .justified-gallery"));

            if ($isTabJustifiedGallery.length > 0) {
              btf.initJustifiedGallery($isTabJustifiedGallery);
            }
          }
        });
      });
    },
    backToTop: function backToTop() {
      document.querySelectorAll('#article-container .tabs .tab-to-top').forEach(function (item) {
        item.addEventListener('click', function () {
          btf.scrollToDest(btf.getEleTop(btf.getParents(this, '.tabs')), 300);
        });
      });
    }
  };

  var toggleCardCategory = function toggleCardCategory() {
    var $cardCategory = document.querySelectorAll('#aside-cat-list .card-category-list-item.parent i');

    if ($cardCategory.length) {
      $cardCategory.forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          var $this = this;
          $this.classList.toggle('expand');
          var $parentEle = $this.parentNode.nextElementSibling;

          if (btf.isHidden($parentEle)) {
            $parentEle.style.display = 'block';
          } else {
            $parentEle.style.display = 'none';
          }
        });
      });
    }
  };

  var switchComments = function switchComments() {
    var switchDone = false;
    var $switchBtn = document.querySelector('#comment-switch > .switch-btn');
    $switchBtn && $switchBtn.addEventListener('click', function () {
      this.classList.toggle('move');
      document.querySelectorAll('#post-comment > .comment-wrap > div').forEach(function (item) {
        if (btf.isHidden(item)) {
          item.style.cssText = 'display: block;animation: tabshow .5s';
        } else {
          item.style.cssText = "display: none;animation: ''";
        }
      });

      if (!switchDone && typeof loadOtherComment === 'function') {
        switchDone = true;
        loadOtherComment();
      }
    });
  };

  var addPostOutdateNotice = function addPostOutdateNotice() {
    var data = GLOBAL_CONFIG.noticeOutdate;
    var diffDay = btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);

    if (diffDay >= data.limitDay) {
      var ele = document.createElement('div');
      ele.className = 'post-outdate-notice';
      ele.textContent = data.messagePrev + ' ' + diffDay + ' ' + data.messageNext;
      var $targetEle = document.getElementById('article-container');

      if (data.position === 'top') {
        $targetEle.insertBefore(ele, $targetEle.firstChild);
      } else {
        $targetEle.appendChild(ele);
      }
    }
  };

  var lazyloadImg = function lazyloadImg() {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: 'img',
      threshold: 0,
      data_src: 'lazy-src'
    });
  };

  var relativeDate = function relativeDate(selector) {
    selector.forEach(function (item) {
      var $this = item;
      var timeVal = $this.getAttribute('datetime');
      $this.innerText = btf.diffDate(timeVal, true);
      $this.style.display = 'inline';
    });
  };

  var unRefreshFn = function unRefreshFn() {
    window.addEventListener('resize', adjustMenu);
    clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
  };

  window.refreshFn = function () {
    initAdjust();

    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG_SITE.isToc && tocFn();
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll('#post-meta time'));
    } else {
      GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll('#recent-posts time'));
      GLOBAL_CONFIG.runtime && addRuntime();
      addLastPushDate();
      toggleCardCategory();
    }

    sidebarFn();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    GLOBAL_CONFIG.highlight && addHighlightTool();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    jqLoadAndRun();
    GLOBAL_CONFIG.lightbox === 'mediumZoom' && addMediumZoom();
    scrollFn();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn.clickFnOfTabs();
    tabsFn.backToTop();
    switchComments();
  };

  refreshFn();
  unRefreshFn();
});