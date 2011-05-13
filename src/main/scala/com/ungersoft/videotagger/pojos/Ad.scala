package com.ungersoft.videotagger.pojos

import com.googlecode.objectify.annotation.{Indexed, Unindexed}
import javax.persistence.Id
import javax.ws.rs._
import com.ungersoft.videotagger.services.datastore.{DataService, AbstractDataStore}
import com.ungersoft.videotagger.util.JAXRSUtil
import core.{MediaType, Response}
import com.google.appengine.api.users.UserService
import com.ungersoft.videotagger.services.user.{CurrentUser}
import com.googlecode.objectify.Key
import javax.xml.bind.annotation.XmlRootElement

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
@Path("/ad")
@XmlRootElement
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
  @Produces(Array(MediaType.APPLICATION_JSON))
  def saveAd(
     //@DefaultValue(null)
//     @DefaultValue("") @FormParam("email") email:String
     @DefaultValue("0") @FormParam("id") id:Long
    ,@DefaultValue("") @FormParam("title") title:String
    ,@DefaultValue("") @FormParam("label") label:String
    ,@DefaultValue("") @FormParam("copy") copy:String
    ,@DefaultValue("0") @FormParam("productId") productId:Long
//  def saveAd(
  ): Response = {    //if(null==0) null else
    val nAd = new Ad(id, title, label, copy)  //no productId?
    DataService().store(nAd)
    val email = CurrentUser().getEmail
//    var account:Account = new Account(email)
//    account =
    val account = DataService().retrieve(classOf[Account],email) match {
      case Some(x) => x
      case None => new Account(email)
    }

//    if(account.ads==null) account.ads  = new Array[Key[Ad]](1)
//    val tempList:List[Key[Ad]] =
    val adKey = new Key(classOf[Ad],nAd.id.longValue)
    var adList = account.ads match {
      case null => Nil
      case x => x.toList
    }
    adList = adKey :: adList
    account.ads = adList.toArray

//    match {
//      case null => new Account(email)
//      case x => x
//    }
//    account.ads :+ nAd //  .ads = nAd :: account.ads
    DataService().store(account)
//    DataService().store(nAd)
    return JAXRSUtil.ok(nAd)
  }
}