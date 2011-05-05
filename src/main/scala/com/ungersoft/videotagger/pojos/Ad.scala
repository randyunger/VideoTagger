package com.ungersoft.videotagger.pojos

import com.googlecode.objectify.annotation.{Indexed, Unindexed}
import javax.persistence.Id

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
class Ad{
  @Id  var id:java.lang.Long = null
  var title:String = _
  var label:String = _
  var copy:String = _
  var product:Product = _

  def this(id:Long, title:String, label:String, copy:String){
    this()
    this.id= if(id==0) null else id
    this.title=title
    this.label=label
    this.copy=copy
  }
}