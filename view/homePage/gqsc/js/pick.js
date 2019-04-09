var nameEl, dataName, typenum, arenum, sortnum;

// ---------------------------------
function ll(ll) {
  var first = [];
  var second = [];
  var third = [];

  var selectedIndex = [0, 0, 0];

  var checked = [0, 0, 0];

  function creatList(obj, list) {
    obj.forEach(function (item, index, arr) {
      var temp = new Object();
      temp.text = item[dataName];
      temp.value = index;
      temp.id = item.id
      list.push(temp);
    })
  }

  creatList(ll, first);
  if (ll[selectedIndex[0]].hasOwnProperty('children')) {
    creatList(ll[selectedIndex[0]].children, second);
  } else {
    second = [{
      text: '',
      value: 0
    }];
  }

  try {
    if (ll[selectedIndex[0]].children[selectedIndex[1]].hasOwnProperty('children')) {
      creatList(ll[selectedIndex[0]].children[selectedIndex[1]].children, third);
    } else {
      third = [{
        text: '',
        value: 0
      }];
    }
  } catch (error) {

  }

  var picker = new Picker({
    data: [first, second, third],
    selectedIndex: selectedIndex,
    title: '地址选择'
  });

  picker.on('picker.select', function (selectedVal, selectedIndex) {

    var text1 = first[selectedIndex[0]].text;
    var text2 = second[selectedIndex[1]].text;
    var text3 = third[selectedIndex[2]] ? third[selectedIndex[2]].text : '';
    nameEl.value = text1 + ' ' + text2 + ' ' + text3;
    ids = first[selectedIndex[0]].id + "," + second[selectedIndex[1]].id + "," + third[selectedIndex[2]].id;
    if (dataName == "categoryName") {
      typenum = ids
    } else if (dataName == "areaName") {
      arenum = ids
    } else if (dataName == "sort") {
      sortnum = ids
    }
  });

  picker.on('picker.change', function (index, selectedIndex) {
    if (index === 0) {
      firstChange();
    } else if (index === 1) {
      secondChange();
    }

    function firstChange() {
      second = [];
      third = [];
      checked[0] = selectedIndex;
      var firstCity = ll[selectedIndex];
      if (firstCity.hasOwnProperty('children')) {
        creatList(firstCity.children, second);

        var secondCity = ll[selectedIndex].children[0]
        if (secondCity.hasOwnProperty('children')) {
          creatList(secondCity.children, third);
        } else {
          third = [{
            text: '',
            value: 0
          }];
          checked[2] = 0;
        }
      } else {
        second = [{
          text: '',
          value: 0
        }];
        third = [{
          text: '',
          value: 0
        }];
        checked[1] = 0;
        checked[2] = 0;
      }

      picker.refillColumn(1, second);
      picker.refillColumn(2, third);
      picker.scrollColumn(1, 0)
      picker.scrollColumn(2, 0)
    }

    function secondChange() {
      third = [];
      checked[1] = selectedIndex;
      var first_index = checked[0];
      if (ll[first_index].children[selectedIndex].hasOwnProperty('children')) {
        var secondCity = ll[first_index].children[selectedIndex];
        creatList(secondCity.children, third);
        picker.refillColumn(2, third);
        picker.scrollColumn(2, 0)
      } else {
        third = [{
          text: '',
          value: 0
        }];
        checked[2] = 0;
        picker.refillColumn(2, third);
        picker.scrollColumn(2, 0)
      }
    }

  });

  picker.on('picker.valuechange', function (selectedVal, selectedIndex) {
    console.log(selectedVal);
    console.log(selectedIndex);
    $(".picker").remove()
    console.log(typenum)
    console.log(arenum)
    if (typenum) {
      var lx = (typenum.split(",")[typenum.split(",").length - 1]) ? (typenum.split(",")[typenum.split(",").length - 1]) : ""
      console.log("类型" + lx)
    }
    console.log(arenum)
    if (arenum) {
      var qy = (arenum.split(",")[arenum.split(",").length - 1]) ? (arenum.split(",")[arenum.split(",").length - 1]) : ""
      console.log("区域" + qy)
    }
    if (sortnum) {
      var px = (sortnum.split(",")[sortnum.split(",").length - 1]) ? (sortnum.split(",")[sortnum.split(",").length - 1]) : ""
      console.log("排序" + px)
    }

  });

  nameEl.addEventListener('click', function () {
    picker.show();
  });
  picker.show();
}





// $(function () {
//   var supDem = {
//     init: function () {
//       supDem.listen();
//     },
//     listen: function () {
//       $.ajax({
//         url: localhost50010 + "/supply/bannerList",
//         type: "GET",
//         dataType: "json",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         beforeSend: function (xhr) {
//           xhr.setRequestHeader("login_token", my_token);
//         },
//         success: function (result) {
//           if (result.code === "0") {

//           }
//         },
//         error: function (error) {
//           console.log(error);
//         }
//       });
//       if (myScroll) {
//         myScroll.refresh();
//       }
//     }
//   };
//   supDem.init();
// });