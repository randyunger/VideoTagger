package com.ungersoft.videotagger.pojos

import javax.persistence.Id
import com.ungersoft.videotagger.services.datastore.DataService
import javax.ws.rs._
import core.{Response, MediaType}
import com.ungersoft.videotagger.services.user.CurrentUser
import com.ungersoft.videotagger.util.JAXRSUtil
import javax.xml.bind.annotation.XmlRootElement
import com.googlecode.objectify.annotation.{Indexed, Unindexed}

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:32 PM
 * To change this template use File | Settings | File Templates.
 */

@Unindexed
@Path("/pos")
@XmlRootElement
class HiLitePosition{
  @Id  var id:java.lang.Long = null
  var data:String = _
  @Indexed var account:String = _
//  var startTime:Long = _
//  var endTime:Long = _
//
//  var startX:Int = _
//  var startY:Int = _
//  var startW:Int = _
//  var startH:Int = _

//  var upLeft_End:Int = _
//  var lowRight_End:Int = _

  def this(id:Long, data:String,  account:Account){
    this()
    this.id= if(id==0) null else id
    //    this.accountKey = new Key(classOf[Account], account.email)
    this.data = data
    this.account=account.email
  }


  @GET
  @Produces(Array(MediaType.APPLICATION_JSON))
  def get( @QueryParam("id") accountId:String) = {
    val hiLite = DataService().query(classOf[HiLitePosition], accountId)
    val json = toJson(hiLite)
    json
  }

  def toJson(all:java.util.List[HiLitePosition]):String={
    var out:String = "\"{"
    val it = all.iterator
    var i=0
//    while(it.hasNext){
      i+=1
//      var current = it.next

      var current = all.get(all.size-1) //just get last

      if(current.data!=null && current.data!="undefined" && current.data!="someTestData"){
        if(i>1) out+=","
        out+="\\\""+current.id + "\\\":{" +
          "\\\"data\\\":\\\""+current.data.replace("\"","\\\\\\\"") +
  //        "\\\"startTime\\\":\\\""+current.startTime +
  //        "\\\",\\\"endTime\\\":\\\""+current.endTime +
  //        "\\\",\\\"startX\\\":\\\""+current.startX +
  //        "\\\",\\\"startY\\\":\\\""+current.startY +
  //        "\\\",\\\"startW\\\":\\\""+current.startW +
  //        "\\\",\\\"startH\\\":\\\""+current.startH +
  //           "\\\",\\\"product\\\":\\\""+ad.product +
             "\\\"}"
      }
      else{
        val l:Long = current.id.longValue
        DataService().delete(classOf[HiLitePosition], l)
      }
//    }
    out+="}\""
    out
  }

  @POST
  @Produces(Array(MediaType.APPLICATION_JSON))
  def savePos(
     @DefaultValue("0") @FormParam("id") id:Long
    ,@DefaultValue("") @FormParam("data") data:String
  ): Response = {
    val email = CurrentUser().getEmail
    val account = DataService().retrieve(classOf[Account],email) match {
      case Some(x) => x
      case None => new Account(email)
    }

    val nPos = new HiLitePosition(id, data, account)
    DataService().store(nPos)
    val lst = new java.util.ArrayList[HiLitePosition]
    lst.add(nPos)
    return JAXRSUtil.ok(toJson(lst))
  }

}