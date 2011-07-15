package com.ungersoft.videotagger.pojos

import com.googlecode.objectify.annotation.{Indexed, Unindexed}
import javax.ws.rs._
import com.ungersoft.videotagger.services.datastore.{DataService, AbstractDataStore}
import com.ungersoft.videotagger.util.JAXRSUtil
import core.{MediaType, Response}
import com.google.appengine.api.users.UserService
import com.ungersoft.videotagger.services.user.{CurrentUser}
import com.googlecode.objectify.Key
import javax.xml.bind.annotation.XmlRootElement
import javax.persistence.{Embedded, Id}
import java.io.StringWriter
import javax.xml.bind.{Marshaller, JAXBContext}
import net.liftweb.json.JsonAST
import net.liftweb.json.JsonDSL._
import net.liftweb.http.js._

//import com.google.appengine.repackaged.com.google.io.base.Marshaller

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
//  var product:Product = _

//  @Embedded var account:Account = _
//  @Indexed var accountKey:Key[Account] = _
  @Indexed var account:String = _

  def this(id:Long, title:String, label:String, copy:String,  account:Account){
    this()
    this.id= if(id==0) null else id
//    this.accountKey = new Key(classOf[Account], account.email)
    this.title=title
    this.label=label
    this.copy=copy
    this.account=account.email
  }

  @GET
  @Produces(Array(MediaType.APPLICATION_JSON))
  def getAds( @QueryParam("id") accountId:String) = {
    val ads = DataService().query(classOf[Ad], accountId)
    val json = toJson(ads)
    json     //needs jxrs.ok?
  }
//    decompose(ads)
//    JsonAST.render(ads)

//    val sw:java.io.StringWriter = new StringWriter();
////    val jc:JAXBContext = JAXBContext.newInstance("com.ungersoft.videotagger.pojos")
//    val jc:JAXBContext = JAXBContext.newInstance(classOf[Ad])
//    val m:Marshaller = jc.createMarshaller()
//    val out2 = m.marshal(ads.toArray(), sw)

//    var out:String = "\"{\\\"ads\\\":["
//    val it = ads.iterator
//    var i=0
//    while(it.hasNext){
//      i+=1
//      val ad = it.next
//      if(i>1) out+=","
//      out+="{\\\"id\\\":\\\""+ad.id +
//           "\\\",\\\"title\\\":\\\""+ad.title +
//           "\\\",\\\"label\\\":\\\""+ad.label +
//           "\\\",\\\"copy\\\":\\\""+ad.copy +
//           "\\\",\\\"product\\\":\\\""+ad.product +
//           "\\\"}"
//    }
//    out+="]}\""


//    val xstream = new XStream(new JettisonMappedXmlDriver())
//    xstream.setMode(XStream.NO_REFERENCES)
//    println("--"+xstream.toXML(product))

  def toJson(ads:java.util.List[Ad]):String={
    var out:String = "\"{"
    val it = ads.iterator
    var i=0
    while(it.hasNext){
      i+=1
      val ad = it.next
      if(i>1) out+=","
      out+="\\\""+ad.id + "\\\":{" +
           "\\\"title\\\":\\\""+ad.title +
           "\\\",\\\"label\\\":\\\""+ad.label +
           "\\\",\\\"copy\\\":\\\""+ad.copy +
//           "\\\",\\\"product\\\":\\\""+ad.product +
           "\\\"}"
    }
    out+="}\""
    out
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
    val email = CurrentUser().getEmail
    val account = DataService().retrieve(classOf[Account],email) match {
      case Some(x) => x
      case None => new Account(email)
    }
    val nAd = new Ad(id, title, label, copy, account)  //no productId?
    DataService().store(nAd)
//    var account:Account = new Account(email)
//    account =


//    if(account.ads==null) account.ads  = new Array[Key[Ad]](1)
//    val tempList:List[Key[Ad]] =
//    val adKey = new Key(classOf[Ad],nAd.id.longValue)
//    var adList = account.ads match {
//      case null => Nil
//      case x => x.toList
//    }
//    adList = adKey :: adList
//    account.ads = adList.toArray
//
////    match {
////      case null => new Account(email)
////      case x => x
////    }
////    account.ads :+ nAd //  .ads = nAd :: account.ads
//    DataService().store(account)
//    DataService().store(nAd)
    val l = new java.util.LinkedList[Ad]()
    l.add(nAd)
    val j = toJson(l)
    return JAXRSUtil.ok(j)
  }


}


//@Path("/ad")
//@XmlRootElement
//object Ad{
//
//}