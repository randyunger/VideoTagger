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
                                 //DAOBase with
class ObjectifyDataStore extends  AbstractDataStore {

  val logger = Logger.getLogger(this.getClass)
//  ObjectifyService.register(YourOtherEntity.class);

  val os:Objectify = ObjectifyService.begin();

  def store[T](t:T) ={
    os.put[T](t)       //put is overloaded because objectify has methods with single and repeating param [(T) and (T...)] and scala cannot choose between them
    logger.warn("test")
  }

  def retrieve[T](clazz:Class[T], id:Long):T = {
    os.find(clazz, id).asInstanceOf[T]
  }
}