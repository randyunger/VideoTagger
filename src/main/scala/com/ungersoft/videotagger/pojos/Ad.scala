package com.ungersoft.videotagger.pojos

import com.googlecode.objectify.annotation.{Indexed, Unindexed}
import javax.persistence.Id
import javax.ws.rs._
import com.ungersoft.videotagger.datastore.{DataService, AbstractDataStore}
import core.Response
import com.ungersoft.videotagger.util.JAXRSUtil

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
@Path("/ad")
class Ad{
//  @Id  @DefaultValue("0") @FormParam("id") var id:java.lang.Long = null
//  @DefaultValue("") @FormParam("title") var title:String = _
//  @DefaultValue("") @FormParam("label") var label:String = _
//  @DefaultValue("") @FormParam("copy") var copy:String = _

  @Id var id:java.lang.Long = null
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

  @POST
//  @Path("/saveAd")
  @Produces(Array("text/plain"))
  def saveAd(
     //@DefaultValue(null)
     @DefaultValue("0") @FormParam("id") id:Long
    ,@DefaultValue("") @FormParam("title") title:String
    ,@DefaultValue("") @FormParam("label") label:String
    ,@DefaultValue("") @FormParam("copy") copy:String
    ,@DefaultValue("0") @FormParam("productId") productId:Long
//  def saveAd(
  ): Response = {    //if(null==0) null else
    val nAd = new Ad(0, title, label, copy)  //no productId?
    DataService().store(nAd)
    return JAXRSUtil.ok("Saved "+nAd.id)
  }
}