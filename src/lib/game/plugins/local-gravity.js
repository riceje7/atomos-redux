/**
 * @author Alexandre Rousseau
 * @version 1.0
 * @licence opensource
 * URL: http://gamecubate.tumblr.com/
 */
ig.module(
	'plugins.local-gravity'
)
.requires(
	'impact.entity'
)
.defines(function(){

ig.Entity.inject({

	localGravity:
	{
		factor:1.0,
		mass:null,
		range:null,
		max:1000
	},

	update: function()
	{
		var others = [];

		if (this.localGravity.mass)
		{
			var ents = ig.game.entities;

			for (var i=0; i<ents.length; i++)
			{
				var ent = ents[i];

				if (ent == this || ! ent.localGravity.mass)
					continue;

				others.push(ent);
			}

			for (var i=0; i<others.length; i++)
				this.gravitateWith(others[i]);
		}

		this.parent();
	},

	gravitateWith: function(other)
	{
		var dx = (other.pos.x + other.size.x/2) - (this.pos.x + this.size.x/2),
				dy = (other.pos.y + other.size.y/2) - (this.pos.y + this.size.y/2),
				distSQ = dx * dx + dy * dy;

		if (distSQ > 0.0001)
		{
			var dist = Math.sqrt(distSQ);

			if (this.localGravity.range && dist > this.localGravity.range)
				return;

			var force = (this.localGravity.mass * this.localGravity.factor) * other.localGravity.mass / distSQ;
			force = force.limit(-this.localGravity.max, this.localGravity.max);

			var	ax = force * dx / dist;
			var	ay = force * dy / dist;

			this.vel.x += ax / this.localGravity.mass;
			this.vel.y += ay / this.localGravity.mass;
		}
	},
});
});