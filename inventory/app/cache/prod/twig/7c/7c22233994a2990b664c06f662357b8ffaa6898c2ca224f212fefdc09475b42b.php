<?php

/* @Framework/Form/choice_widget_expanded.html.php */
class __TwigTemplate_6cafb396379a556d281db6eeb4d5fe8e31c03dd1204917508ddaaf7a17650c1b extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_0444ea2dd8bf2ba27e1e51cd0558ac49bd810ffa5baa42d581543bed71176f05 = $this->env->getExtension("native_profiler");
        $__internal_0444ea2dd8bf2ba27e1e51cd0558ac49bd810ffa5baa42d581543bed71176f05->enter($__internal_0444ea2dd8bf2ba27e1e51cd0558ac49bd810ffa5baa42d581543bed71176f05_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/choice_widget_expanded.html.php"));

        // line 1
        echo "<div <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
<?php foreach (\$form as \$child): ?>
    <?php echo \$view['form']->widget(\$child) ?>
    <?php echo \$view['form']->label(\$child, null, array('translation_domain' => \$choice_translation_domain)) ?>
<?php endforeach ?>
</div>
";
        
        $__internal_0444ea2dd8bf2ba27e1e51cd0558ac49bd810ffa5baa42d581543bed71176f05->leave($__internal_0444ea2dd8bf2ba27e1e51cd0558ac49bd810ffa5baa42d581543bed71176f05_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/choice_widget_expanded.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <div <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/* <?php foreach ($form as $child): ?>*/
/*     <?php echo $view['form']->widget($child) ?>*/
/*     <?php echo $view['form']->label($child, null, array('translation_domain' => $choice_translation_domain)) ?>*/
/* <?php endforeach ?>*/
/* </div>*/
/* */
