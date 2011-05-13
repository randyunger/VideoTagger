package com.ungersoft.videotagger.services.datastore

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
class ObjectifyDataStore extends AbstractDataStore {

  val logger = Logger.getLogger(this.getClass)
//  ObjectifyService.register(YourOtherEntity.class);

  val os:Objectify = ObjectifyService.begin();

  def store[T](t:T) ={
    os.put[T](t)       //put is overloaded because objectify has methods with single and repeating param [(T) and (T...)] and scala cannot choose between them
    logger.warn("test")
  }

  def retrieve[T](clazz:Class[T], id:Long):Option[T] = {
    os.get[T](clazz, id).asInstanceOf[T] match {
      case null => None
      case x => Some(x)
    }
  }

//  def retrieve[T](clazz:Class[T], id:Array[Long]):Option[T] = {
//    os.get(clazz, id).asInstanceOf[T] match {
//      case null => None
//      case x => Some(x)
//    }
//  }

  def retrieve[T](clazz:Class[T], id:String):Option[T] = {
    os.get[T](clazz, id).asInstanceOf[T] match {
      case null => None
      case x => Some(x)
    }
  }

//  def retrieve[T](clazz:Class[T], id:Array[String]):Option[T] = {
//    os.get(clazz, id).asInstanceOf[T] match {
//      case null => None
//      case x => Some(x)
//    }
//  }

//   def find[T](clazz:Class[T], id:Long):T = {
//
//   }
}