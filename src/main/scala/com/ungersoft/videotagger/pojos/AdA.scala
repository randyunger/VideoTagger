package com.ungersoft.videotagger.pojos

import com.googlecode.objectify.annotation.{Indexed, Unindexed}
import javax.persistence._
/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
class AdA{
  @javax.persistence.Id  val id:Long = null
  val copy = "The first ad is right here! Click now!"
  val title = "First ad!"
  val label = "First ad - 1"
}