/**
 * Created by mhdevita on 12/14/16.
 */
import { Schema, arrayOf } from 'normalizr';
const itemSchema     = new Schema('item');
const locationSchema = new Schema('location');
const rackSchema     = new Schema('rack');
const subnetSchema   = new Schema('subnet');
const domainSchema   = new Schema('domain');
const userSchema     = new Schema('user');
const commentSchema  = new Schema('comment');

itemSchema.define({
  rack: rackSchema,
  subnets: arrayOf(subnetSchema),
  domains: arrayOf(domainSchema),
  comments: arrayOf(commentSchema),
  createdBy: userSchema,
  updatedBy: userSchema
});
locationSchema.define({
  racks: arrayOf(rackSchema),
  subnets: arrayOf(subnetSchema),
  domains: arrayOf(domainSchema),
  comments: arrayOf(commentSchema),
  createdBy: userSchema,
  updatedBy: userSchema
});
rackSchema.define({
  items: arrayOf(itemSchema),
  location: locationSchema,
  comments: arrayOf(commentSchema),
  createdBy: userSchema,
  updatedBy: userSchema
})
subnetSchema.define({
  location: locationSchema,
  items: arrayOf(itemSchema),
  domains: arrayOf(domainSchema),
  comments: arrayOf(commentSchema),
  createdBy: userSchema,
  updatedBy: userSchema
})
domainSchema.define({
  location: locationSchema,
  items: arrayOf(itemSchema),
  subnets: arrayOf(subnetSchema),
  comments: arrayOf(commentSchema),
  createdBy: userSchema,
  updatedBy: userSchema
});
userSchema.define({
  locations: arrayOf(locationSchema),
  items: arrayOf(itemSchema),
  subnets: arrayOf(subnetSchema),
  domains: arrayOf(domainSchema),
  racks: arrayOf(rackSchema),
  comments: arrayOf(commentSchema),
  createdBy: userSchema,
  updatedBy: userSchema
});
commentSchema.define({
  createdBy: userSchema,
  updatedBy: userSchema
});

export default {
  itemSchema,
  locationSchema,
  rackSchema,
  subnetSchema,
  domainSchema,
  userSchema,
  commentSchema
}
