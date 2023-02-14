const isEqualStr = (str1, str2) => {
    if ( str1.length !== str2.length ) {
      console.log('false');
      return false;
    } else {
      for ( let i = 0; i< str1.length; i++) {
        if ( str1[i] !== str2[i]) {
          console.log(str1[i]);
          return false;
        } 
      }
      console.log('true')
        return true;
    }
  }
  