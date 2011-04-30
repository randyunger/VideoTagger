package com.ungersoft.videotagger.datastore

import com.googlecode.objectify.util.DAOBase
import com.ungersoft.videotagger.pojos.Ad
import com.googlecode.objectify.{Objectify, ObjectifyService}
import org.apache.log4j.Logger

/**
 * Created by IntelliJ IDEA.
 * User: Randy
 * Date: 4/26/11
 * Time: 9:29 PM
 * To change this template use File | Settings | File Templates.
 */

class ObjectifyDataStore extends DAOBase with AbstractDataStore {

  val logger = Logger.getLogger(this.getClass)
  ObjectifyService.register(classOf[Ad])
//  ObjectifyService.register(YourOtherEntity.class);

  val ofy:Objectify = ObjectifyService.begin();

  def store(ad:Ad) ={
    ofy.put(ad)
    logger.warn("test")
  }

  def retrieve(id:String) = null
}