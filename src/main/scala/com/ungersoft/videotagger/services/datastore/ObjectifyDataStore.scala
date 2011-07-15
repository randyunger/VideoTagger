package com.ungersoft.videotagger.services.datastore

import com.googlecode.objectify.util.DAOBase
import org.apache.log4j.Logger
import com.googlecode.objectify.{Key, NotFoundException, Objectify, ObjectifyService}
import com.ungersoft.videotagger.pojos.{HiLite, HiLitePosition, Account, Ad}

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
  register(classOf[Ad])
  register(classOf[Account])
  register(classOf[HiLitePosition])
  register(classOf[HiLite])

  def register[T](clazz:Class[T]){
    os.getFactory.register(clazz)
  }


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

//  def query[T](clazz:Class[T], id:Long):T = {
//  def query = {
//    os.query[Object]()
//  }
  def query[T](clazz:Class[T], account:String): java.util.List[T] = { //Option[java.util.List[T]] = {
//    val l = os.query[T](clazz).filter("accountKey =", new Key(clazz, account)).list
//    val l = os.query[T](clazz).filter("account", account).list
    val l = os.query[T](clazz).list    //temp
             //no filtering!?
    l
//    l.size match{
//      case 0 => None
//      case _ => Some(l)
//    }

  }

//  def retrieve[T](clazz:Class[T], id:Array[Long]):Option[T] = {
//    os.get(clazz, id).asInstanceOf[T] match {
//      case null => None
//      case x => Some(x)
//    }
//  }

  def retrieve[T](clazz:Class[T], id:String):Option[T] = {
    try{
      os.get[T](clazz, id).asInstanceOf[T] match {
        case null => None
        case x => Some(x)
      }
    }
    catch{
      case e:NotFoundException => None
    }
  }

//  def delete[T](clazz:Class[T], id:String){
//    os.delete(clazz, id)
//  }

  def delete[T](clazz:java.lang.Class[T], id:Long){
    val k = new Key(clazz, id)
    os.delete(k)
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