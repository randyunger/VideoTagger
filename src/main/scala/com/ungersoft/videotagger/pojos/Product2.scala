package com.ungersoft.videotagger.pojos

import com.googlecode.objectify.annotation.Unindexed
import javax.persistence.Id

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
class Product2{
  @Id  var id:java.lang.Long = null
  var link:String = _
  var imgUrl:String = _
}