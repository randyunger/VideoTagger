package com.ungersoft.videotagger.pojos

import javax.persistence.Id
import com.googlecode.objectify.annotation.Unindexed

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 5/4/11
 * Time: 6:07 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
class HiLite{
  @Id var id:java.lang.Long = null
  var ad:Ad = _
  var position:HiLitePosition = _
}