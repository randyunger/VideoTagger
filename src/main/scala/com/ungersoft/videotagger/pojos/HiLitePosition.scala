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
class HiLitePosition{
  @Id  var id:java.lang.Long = null
  var startFrame:Long = _
  var endFrame:Long = _

  var upLeft_Start:Int = _
  var lowRight_Start:Int = _

  var upLeft_End:Int = _
  var lowRight_End:Int = _
}