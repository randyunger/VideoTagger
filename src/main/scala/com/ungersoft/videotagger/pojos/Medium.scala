package com.ungersoft.videotagger.pojos

import javax.persistence.Id
import com.googlecode.objectify.annotation.Unindexed

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:31 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
class Medium{
  @Id  var id:java.lang.Long = null
  var title:String = _
  var ads:List[HiLite] = _
}